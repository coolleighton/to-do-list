let tasks = [
    { name: "Hover floor",
      description: "hover downstairs floors",
      date: "20th july",
      priority: "Priortiy 1",
    },

    { name: "Hover floor",
      description: "hover downstairs floors",
      date: "20th july",
      priority: "Priortiy 1",
    },

    { name: "Hover floor",
      description: "hover downstairs floors",
      date: "20th july",
      priority: "Priortiy 1",
    },
]

// Selectors //

const tasksArea = document.querySelector("#tasksArea")


// Create addTaskForm // 

function createForm() {
    const form = document.createElement("form")
    form.classList.add("add-task-form")

    const name = document.createElement("input")
    name.type = "text"
    name.placeholder = "Task name"

    const description = document.createElement("input")
    description.type = "text"
    description.placeholder = "Description"

    const thirdRow = document.createElement("div")
    thirdRow.classList.add("form-third-row")

    const dateInput = document.createElement("input")
    dateInput.type = "date"

    const priority = document.createElement("select")
    const option1 = document.createElement("option")
    option1.value = "priority 1"
    option1.textContent = "priority 1"
    const option2 = document.createElement("option")
    option2.value = "priority 2"
    option2.textContent = "priority 2"
    const option3 = document.createElement("option")
    option3.value = "priority 3"
    option3.textContent = "priority 3"

    const forthRow = document.createElement("div")
    forthRow.classList.add("form-forth-row")

    const cancel = document.createElement("button")
    cancel.textContent = "Cancel"
    cancel.addEventListener("click", function(b, e) {
        b.preventDefault()
        cancel.parentElement.parentElement.remove()
        renderAndDisplayAddTask()
    })
    
    const submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Add task"
    submit.addEventListener("click", function(e) {
        e.preventDefault()
        console.log("submitted")
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

    tasksArea.appendChild(form)

}


// render and display addtask button //

function renderAndDisplayAddTask() {
    const button = document.createElement("button")
    button.classList.add("add-task")
    button.classList.add("task")
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
        createForm()
        button.style.display = "none"
    })

    tasksArea.appendChild(button)

}


// Render tasks //

function renderTask(title, description, dueDate, priorityNum) {
    const task = document.createElement("div")
    task.classList.add("task")

    const taskCheckBox = document.createElement("div")

    const checkBox = document.createElement("input")
    checkBox.type = "checkbox"

    const taskInfo = document.createElement("div")

    const taskTitle = document.createElement("h2")
    taskTitle.textContent = title

    const taskDescription = document.createElement("p")
    taskDescription.textContent = description

    const thirdRow = document.createElement("div")
    thirdRow.classList.add("third-row")

    const calendar = document.createElement("img")
    calendar.src = "images/calendar.png"

    const calendarText = document.createElement("p")
    calendarText.textContent = dueDate

    const priorityText = document.createElement("p")
    priorityText.classList.add("priority")
    priorityText.textContent = priorityNum

    const divider = document.createElement("hr")

    task.appendChild(taskCheckBox)
    taskCheckBox.appendChild(checkBox)

    task.appendChild(taskInfo)
    taskInfo.appendChild(taskTitle)
    taskInfo.appendChild(taskDescription)
    taskInfo.appendChild(thirdRow)
    
    thirdRow.appendChild(calendar)
    thirdRow.appendChild(calendarText)
    thirdRow.appendChild(priorityText)

    tasksArea.appendChild(task)
    tasksArea.appendChild(divider)
}


// display tasks

function displayTasks() {
    for (i = 0; i < tasks.length; i++) {
        renderTask(tasks[i].name, tasks[i].description, tasks[i].date, tasks[i].priority)
    }

    renderAndDisplayAddTask()
}

// add task to array 





displayTasks()





