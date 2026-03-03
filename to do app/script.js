document.addEventListener("DOMContentLoaded", loadTasks);

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addTask);

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTask(taskText, false);
    saveTasks();
    input.value = "";
}

function createTask(text, completed) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;
    span.className = "task-text";

    if (completed) {
        span.classList.add("completed");
    }

    // Toggle complete
    span.addEventListener("click", function () {
        span.classList.toggle("completed");
        saveTasks();
    });

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    editBtn.addEventListener("click", function () {
        const newText = prompt("Edit task:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
            saveTasks();
        }
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        const text = li.querySelector(".task-text").textContent;
        const completed = li.querySelector(".task-text").classList.contains("completed");

        tasks.push({ text, completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task.text, task.completed);
    });
}