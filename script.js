document.addEventListener('DOMContentLoaded', loadTask);

function loadTask() {
    // database theke data dekhabo
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach(task => addTaskToDOM(task));
}


function addTask() {
    let textInput = document.getElementById('taskInput');
    let taskText = textInput.value;
    
    // DOM vitore dekhaite hbe
    

    addTaskToDOM(taskText)
    // local storage save korte hbe

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks))
    textInput.value = "";
}


function addTaskToDOM(taskText) {
    let ul = document.getElementById('taskList');
    console.log(ul)
    let li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <span>
            <span class="delete btn btn-danger" onclick="deleteTask(this)" >Delete</span>
        </span>
        <span class="edit btn btn-danger" onclick="editTask(this)" >Edit</span>
        </span>
    `
    ul.appendChild(li)       
}

function deleteTask(element) {
    let li = element.parentElement.parentElement;
    let taskText = li.firstElementChild.innerText;

    li.remove()

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks = tasks.filter(task => task !== taskText)
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
function editTask(element) {
    let li = element.parentElement.parentElement;  // Get the parent <li> element
    let taskTextElement = li.firstElementChild;   // Get the <span> or <p> element containing task text
    let oldTaskText = taskTextElement.innerText;  // Store the old task text

    let newTaskText = prompt("Edit your task:", oldTaskText);  // Prompt user for new text

    if (newTaskText && newTaskText.trim() !== "") {  // Ensure it's not empty
        taskTextElement.innerText = newTaskText;  // Update UI

        // Update localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let taskIndex = tasks.indexOf(oldTaskText);

        if (taskIndex !== -1) {
            tasks[taskIndex] = newTaskText;  // Replace old task with new one
            localStorage.setItem("tasks", JSON.stringify(tasks));  // Save changes
        }
    }
}