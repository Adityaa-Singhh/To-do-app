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
                <img src="./img/edit.png" onclick="editTask(${index})" alt="Edit" />
                <img src="./img/bin.png" onclick="deleteTask(${index})" alt="Delete" />
            </div>
        </div>`;

        tasksList.appendChild(listItem);
    });
};

document.getElementById("taskForm").addEventListener("submit", function(e) {
    e.preventDefault();
    addTask();
});
