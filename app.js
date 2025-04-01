let task = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        task.push({ text: text, completed: false });
        taskInput.value = "";
    }
    updateTasksList();
    updateStats();
};

const toggleTaskComplete = (index) => {
    task[index].completed = !task[index].completed;
    updateTasksList();
    updateStats();
};

const deleteTask = (index) => {
    task.splice(index, 1);
    updateTasksList();
    updateStats();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = task[index].text;

    task.splice(index, 1);
    updateTasksList();
    updateStats();
};

const updateStats = () => {
    const completeTasks = task.filter(task => task.completed).length;
    const totalTasks = task.length;
    const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;

    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;

    if(task.length && completeTasks === totalTasks){
        blastConfetti();
    }
};

const updateTasksList = () => {
    const tasksList = document.getElementById("task-list");
    tasksList.innerHTML = "";

    task.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskComplete(${index})"/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./edit.png" onclick="editTask(${index})" alt="Edit" />
                <img src="./bin.png" onclick="deleteTask(${index})" alt="Delete" />
            </div>
        </div>`;

        tasksList.appendChild(listItem);
    });
};

document.getElementById("taskForm").addEventListener("submit", function(e) {
    e.preventDefault();
    addTask();
});


const blastConfetti = ()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}


document.addEventListener("DOMContentLoaded", () => {
  const voiceIcon = document.querySelector(".voice-icon");
  const taskInput = document.getElementById("taskInput");

  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
  }

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true; // Keep listening until the user stops talking
  recognition.interimResults = false; // Returns only the final result
  recognition.lang = "en-US"; // Set language (change if needed)

  voiceIcon.addEventListener("click", () => {
      recognition.start();
  });

  recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript.toLowerCase().trim();
      console.log("Voice Command:", voiceText); // Debugging

      // Check for task-related commands
      if (voiceText.startsWith("add")) {
          let newTask = voiceText.replace("add", "").trim();
          if (newTask) {
              addTaskFromVoice(newTask);
          }
      } else if (voiceText.startsWith("delete")) {
          let taskToDelete = voiceText.replace("delete", "").trim();
          deleteTaskByName(taskToDelete);
      } else if (voiceText.startsWith("edit")) {
          let taskToEdit = voiceText.replace("edit", "").trim();
          editTaskByName(taskToEdit);
      } else if (voiceText.startsWith("complete")) {
          let taskToComplete = voiceText.replace("complete", "").trim();
          completeTaskByName(taskToComplete);
      } else {
          taskInput.value = voiceText; // Default behavior: Add as task input
      }
  };

  recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
  };
});

// Function to add a task from voice input
const addTaskFromVoice = (taskName) => {
  if (taskName) {
      task.push({ text: taskName, completed: false });
      updateTasksList();
      updateStats();
  }
};

// Function to delete a task by name
const deleteTaskByName = (taskName) => {
  const index = task.findIndex((t) => t.text.toLowerCase() === taskName.toLowerCase());
  if (index !== -1) {
      deleteTask(index);
  } else {
      alert(`Task "${taskName}" not found.`);
  }
};

// Function to edit a task by name
const editTaskByName = (taskName) => {
  const index = task.findIndex((t) => t.text.toLowerCase() === taskName.toLowerCase());
  if (index !== -1) {
      editTask(index);
  } else {
      alert(`Task "${taskName}" not found.`);
  }
};

// Function to mark a task as complete by name
const completeTaskByName = (taskName) => {
  const index = task.findIndex((t) => t.text.toLowerCase() === taskName.toLowerCase());
  if (index !== -1) {
      toggleTaskComplete(index);
  } else {
      alert(`Task "${taskName}" not found.`);
  }
};
