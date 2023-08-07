let tasks = []
let tasksTakenFromStorage = JSON.parse(localStorage.getItem("tasks"))

// Selectors //

const tasksArea = document.querySelector("#tasksArea")

// function to construct new task object // 

function createTaskObject(name, description, date, priority, dataId) {

    this.name = name
    this.description = description
    this.date = date
    this.priority = priority
    this.dataId = dataId
}


// Render a task //

function renderTask(title, description, dueDate, priorityNum, dataId) {
    
    const task = document.createElement("div")
    task.classList.add("task")
    task.setAttribute("data-id", dataId)

    const taskCheckBox = document.createElement("div")

    const checkBox = document.createElement("input")
    checkBox.type = "checkbox"
    checkBox.addEventListener("change", function(e) {

        e.target.parentElement.parentElement.remove()
  
        let arrayIndex = tasks.findIndex(item => item.dataId === parseInt(e.target.parentElement.parentElement.dataset.id))

        tasks.splice(arrayIndex, 1)

        addTasksToLocalStorage()
        
    })

    const taskInfo = document.createElement("div")

    const taskTitle = document.createElement("h2")
    taskTitle.textContent = title

    const taskDescription = document.createElement("p")
    taskDescription.textContent = description

    const thirdRow = document.createElement("div")
    thirdRow.classList.add("third-row")

    
    if (dueDate) {
        const calendar = document.createElement("img")
        calendar.src = "images/calendar.png"
        thirdRow.appendChild(calendar)

        const calendarText = document.createElement("p")
        calendarText.textContent = dueDate
        calendarText.classList.add("due-date")
        thirdRow.appendChild(calendarText)
    }

    const priorityText = document.createElement("p")
    priorityText.textContent = priorityNum

    const editImg = document.createElement("img")
    editImg.src = "images/edit-grey.png"
    editImg.classList.add("edit-img")

    editImg.addEventListener("mouseenter", function() {
        editImg.src = "images/edit-black.png";
    })

    editImg.addEventListener("mouseleave", function() {
        editImg.src = "images/edit-grey.png"
    })

    editImg.addEventListener("click", function() {
        task.parentNode.insertBefore(createEditTaskForm(title, description, dueDate, priorityNum, dataId), task.nextSibling)
        document.querySelector("#addTaskButton").remove()
        task.remove()
    })

    task.appendChild(taskCheckBox)
    taskCheckBox.appendChild(checkBox)

    task.appendChild(taskInfo)
    task.appendChild(editImg)
    taskInfo.appendChild(taskTitle)
    taskInfo.appendChild(taskDescription)
    taskInfo.appendChild(thirdRow)
    thirdRow.appendChild(priorityText)

    tasksArea.appendChild(task)
}


// render all tasks //

function renderAllTasks() {

    tasksArea.innerHTML = ""

    const mainTitle = document.createElement("h1")
    mainTitle.textContent = "To-Do List"

    tasksArea.appendChild(mainTitle)

    for (i = 0; i < tasks.length; i++) {
        renderTask(tasks[i].name, tasks[i].description, tasks[i].date, tasks[i].priority, tasks[i].dataId)
    }

    renderAndDisplayAddTaskButton()
}


// render and display addtask button //

function renderAndDisplayAddTaskButton() {
    const button = document.createElement("button")
    button.classList.add("add-task")
    button.setAttribute("id", "addTaskButton")

    const plusImg = document.createElement("img")
    plusImg.src = "images/plus-blue.png"

    const plusButtonText = document.createElement("h2")
    plusButtonText.textContent = "Add task"

    button.appendChild(plusImg)
    button.appendChild(plusButtonText)

    button.addEventListener("mouseenter", function() {
        plusImg.src = "images/plus-blue-full.png";
        plusButtonText.style.color = "#1C6EF2"
    })

    button.addEventListener("mouseleave", function() {
        plusImg.src = "images/plus-blue.png"
        plusButtonText.style.color = "#0E0901"
    })

    button.addEventListener("click", function() {
        tasksArea.appendChild(createAddTaskForm())
        button.style.display = "none"
    })

    tasksArea.appendChild(button)

}


// Create addTaskForm //

function createAddTaskForm() {
    const form = document.createElement("form")
    form.classList.add("add-task-form")

    const name = document.createElement("input")
    name.type = "text"
    name.placeholder = "Task name"
    name.setAttribute("required", true)

    const description = document.createElement("input")
    description.type = "text"
    description.placeholder = "Description"

    const thirdRow = document.createElement("div")
    thirdRow.classList.add("form-third-row")

    const dateInput = document.createElement("input")
    dateInput.type = "date"

    const priority = document.createElement("select")
    const option1 = document.createElement("option")
    option1.value = "Priority 1"
    option1.textContent = "Priority 1"
    const option2 = document.createElement("option")
    option2.value = "Priority 2"
    option2.textContent = "Priority 2"
    const option3 = document.createElement("option")
    option3.value = "Priority 3"
    option3.textContent = "Priority 3"


    const forthRow = document.createElement("div")
    forthRow.classList.add("form-forth-row")

    const cancel = document.createElement("button")
    cancel.textContent = "Cancel"
    cancel.addEventListener("click", function(e) {
        e.preventDefault()
        cancel.parentElement.parentElement.remove()
        renderAndDisplayAddTaskButton()
        renderAllTasks()
    })
    
    const submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Add task"
    form.addEventListener("submit", function(e) {
        e.preventDefault()
        
        let task = new createTaskObject(name.value, description.value, dateInput.value, priority.value, Date.now())

        tasks.push(task)
        addTasksToLocalStorage()

        renderAllTasks()
        
    })

    form.appendChild(name)
    form.appendChild(description)
    form.appendChild(thirdRow)
    form.appendChild(forthRow)
    thirdRow.appendChild(dateInput)
    thirdRow.appendChild(priority)
    priority.appendChild(option1)
    priority.appendChild(option2)
    priority.appendChild(option3)
    forthRow.appendChild(cancel)
    forthRow.appendChild(submit)

    return form

}

// Create editTaskForm //

function createEditTaskForm(title, description, dueDate, priorityNum, dataId) {

    const form = document.createElement("form")
    form.classList.add("add-task-form")

    const nameInput = document.createElement("input")
    nameInput.type = "text"
    nameInput.placeholder = "Task name"
    nameInput.value = title
    nameInput.setAttribute("required", true)

    const descriptionInput = document.createElement("input")
    descriptionInput.type = "text"
    descriptionInput.placeholder = "Description"
    descriptionInput.value = description

    const thirdRow = document.createElement("div")
    thirdRow.classList.add("form-third-row")

    const dateInput = document.createElement("input")
    dateInput.type = "date"
    dateInput.value = dueDate

    const priority = document.createElement("select")
    const option1 = document.createElement("option")
    option1.value = "Priority 1"
    option1.textContent = "Priority 1"
    const option2 = document.createElement("option")
    option2.value = "Priority 2"
    option2.textContent = "Priority 2"
    const option3 = document.createElement("option")
    option3.value = "Priority 3"
    option3.textContent = "Priority 3"
    priority.value = priorityNum

    const forthRow = document.createElement("div")
    forthRow.classList.add("form-forth-row")

    const cancel = document.createElement("button")
    cancel.textContent = "Cancel"
    cancel.addEventListener("click", function(e) {
        e.preventDefault()
        cancel.parentElement.parentElement.remove()
        renderAndDisplayAddTaskButton()
        renderAllTasks()
    })
    
    const submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Save"
    form.addEventListener("submit", function(e) {
        e.preventDefault()
  
        let arrayIndex = tasks.findIndex(item => item.dataId === dataId)

        tasks[arrayIndex].name = nameInput.value
        tasks[arrayIndex].description = descriptionInput.value
        tasks[arrayIndex].date = dateInput.value
        tasks[arrayIndex].priority = priority.value

        addTasksToLocalStorage()
        renderAllTasks()

        console.log(tasks)
        
    })

    form.appendChild(nameInput)
    form.appendChild(descriptionInput)
    form.appendChild(thirdRow)
    form.appendChild(forthRow)
    thirdRow.appendChild(dateInput)
    thirdRow.appendChild(priority)
    priority.appendChild(option1)
    priority.appendChild(option2)
    priority.appendChild(option3)
    forthRow.appendChild(cancel)
    forthRow.appendChild(submit)

    return form

}

function addTasksToLocalStorage() {
    let TasksForStorage = JSON.stringify(tasks)
    localStorage.setItem("tasks", TasksForStorage)

    console.log(tasksTakenFromStorage)
    console.log(tasks)

}

function loadTasksFromStorage() {

    tasks = tasksTakenFromStorage

    console.log(tasksTakenFromStorage)
    console.log(tasks)

    renderAllTasks()
}


loadTasksFromStorage()





