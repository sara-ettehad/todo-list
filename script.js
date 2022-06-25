const taskInput = document.querySelector(".task-input");
const addButton = document.querySelector(".add-button");
const taskList = document.querySelector(".task-list");
const filterOptions = document.querySelector(".filter-options");

addButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteCompleteTask);
filterOptions.addEventListener("click", filterTask);
document.addEventListener("DOMContentLoaded", getTasks);

function addTask(event) {
    event.preventDefault();
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const newTask = document.createElement("li");
    newTask.innerText = taskInput.value;

    saveLocalTask(taskInput.value);

    newTask.classList.add("task-item");

    taskDiv.appendChild(newTask);
    taskInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("completed-btn");
    taskDiv.appendChild(completedButton);

    const deletedButton = document.createElement("button");
    deletedButton.innerHTML = "<i class='fas fa-trash'></i>";
    deletedButton.classList.add("deleted-btn");
    taskDiv.appendChild(deletedButton);

    taskList.appendChild(taskDiv);
}

function deleteCompleteTask(event) {
    const item = event.target;
    console.log(item.parentElement);

    if (item.classList[0] === "deleted-btn") {
        const task = item.parentElement;
        removeLocalTask(task);
        task.remove();
    }
    if (item.classList[0] === "completed-btn") {
        const task = item.parentElement;
        task.classList.toggle("completed");
    }
}

function filterTask(event) {
    const tasks = taskList.childNodes;
    tasks.forEach(function(task) {
        switch (event.target.value) {
            case "All":
                task.style.display = "flex";
                break;
            case "Completed":
                if (task.classList.contains("completed")) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
                break;
            case "Uncompleted":
                if (task.classList.contains("completed")) {
                    task.style.display = "none";
                } else {
                    task.style.display = "flex";
                }
        }
    });
}

function saveLocalTask(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeLocalTask(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const newTask = document.createElement("li");
        newTask.innerText = task;

        newTask.classList.add("task-item");

        taskDiv.appendChild(newTask);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add("completed-btn");
        taskDiv.appendChild(completedButton);

        const deletedButton = document.createElement("button");
        deletedButton.innerHTML = "<i class='fas fa-trash'></i>";
        deletedButton.classList.add("deleted-btn");
        taskDiv.appendChild(deletedButton);

        taskList.appendChild(taskDiv);
    });
}