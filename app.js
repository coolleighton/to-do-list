let projects = []
let projectsTakenFromStorage = JSON.parse(localStorage.getItem("Projects"))

// Selectors //

const tasksArea = document.querySelector("#tasksArea")
const headerAddTaskButton = document.querySelector("#headerAddTaskButton")
const sideMenu = document.querySelector("#sideMenu")
const lineMenuButton = document.querySelector("#lineMenuButton")
const addProjectsButton = document.querySelector("#addProject")
const addProjectFormDiv = document.querySelector("#add-project-Form")
const addProjectForm = document.querySelector("#add-project-Form-proper")
const addProjectsCancelButton = document.querySelector("#add-project-cancel")
const projectName = document.querySelector("#project-name")
const projectList = document.querySelector("#project-list")


// add projects display form button //

addProjectsButton.addEventListener("click", function() {
    if (addProjectFormDiv.style.display === "block") {
        addProjectFormDiv.style.display = "none" 
    }
    else {
        addProjectFormDiv.style.display = "block"
    }
})


// add projects cancel button //

addProjectsCancelButton.addEventListener("click" , function() {
    if (addProjectFormDiv.style.display === "block") {
        addProjectFormDiv.style.display = "none" 
    }
    else {
        addProjectFormDiv.style.display = "block"
    }
})


// add project to projects array // 

addProjectForm.addEventListener("submit", function(e) {
    e.preventDefault()

    if(projectName.value) {

        let project = new createProjectArray(projectName.value)
        projects.push(project)

        projectList.innerHTML = ""

        renderProjectsMenu()
        addProjectsToLocalStorage()
        
        projectName.value = ""
        addProjectFormDiv.style.display = "none" 

    }
})


// function to create a new project array // 

function createProjectArray(projectName) {

    this.projectName = projectName
    this.projectId = Date.now()
    this.tasks = []
}


// Function to render all projects in side menu // 

function renderProjectsMenu() {
    
    projectList.innerHTML = ""

    for (i = 0; i < projects.length; i++) {

        let project = document.createElement("li")
        project.setAttribute("data-id", projects[i].projectId)

        let projectTitle = document.createElement("h4")
        projectTitle.textContent = projects[i].projectName
        projectTitle.setAttribute("data-id", projects[i].projectId)
        
        project.addEventListener("click", function(e) {
            let projectIndex = projects.findIndex(item => item.projectId === parseInt(e.target.dataset.id))

            renderProjectTasks(projectIndex)
        })

        let editImg = document.createElement("img")
        editImg.src = "images/edit-black.png"
        editImg.setAttribute("data-id", projects[i].projectId)
        
        project.appendChild(projectTitle)
        project.appendChild(editImg)
        projectList.appendChild(project)

    }
}


// render a projects tasks //

function renderProjectTasks(projectIndex) {

    tasksArea.innerHTML = ""
    tasksArea.setAttribute("data-id", projects[projectIndex].projectId)

    const mainTitle = document.createElement("h1")
    mainTitle.textContent = projects[projectIndex].projectName
    mainTitle.style.marginTop = "20px"
    mainTitle.classList.add("projectTitle")

    tasksArea.appendChild(mainTitle)

    for (i = 0; i < projects[projectIndex].tasks.length; i++) {
        renderTask(projects[projectIndex].tasks[i].name, projects[projectIndex].tasks[i].description, projects[projectIndex].tasks[i].date, projects[projectIndex].tasks[i].priority, projects[projectIndex].tasks[i].dataId,projectIndex)
    }

    renderAndDisplayAddTaskButton(projectIndex)
    renderDeleteProjectButton(projectIndex)
}

// render delete project button // 

function renderDeleteProjectButton() {
    const deleteProjectDiv = document.createElement("div")
    deleteProjectDiv.classList.add("deleteProjectDiv")
    const deleteProjectIcon = document.createElement("img")
    deleteProjectIcon.src = "images/deleteLine.png"
    const deleteProjectText = document.createElement("h2")
    deleteProjectText.textContent = "Delete project"

    deleteProjectDiv.appendChild(deleteProjectIcon)
    deleteProjectDiv.appendChild(deleteProjectText)
    tasksArea.appendChild(deleteProjectDiv)

    deleteProjectDiv.addEventListener("mouseenter", function() {
        deleteProjectIcon.src = "images/deleteFull.png";
        deleteProjectText.style.color = "#FF000085"
    })

    deleteProjectDiv.addEventListener("mouseleave", function() {
        deleteProjectIcon.src = "images/deleteLine.png"
        deleteProjectText.style.color = "#0E0901"
    })

    deleteProjectDiv.addEventListener("click", function(e) {

        if (e.target.parentElement.parentElement.firstChild.textContent === "Main Tasks") {
            alert("You cannot delete the Main Tasks project")
        }
        else {
            confirmDelete(e)
        }
    })
}

// confirm action alert //

function confirmDelete(e) {
    
        const response = confirm("Are you sure you want to delete this project?");

        if (response) {
            deleteProject(e)
            renderProjectsMenu()
            renderProjectTasks(0)
            addProjectsToLocalStorage()
        } 
    }

// delete project from project array // 

function deleteProject(e) {

    let Index = projects.findIndex(item => item.projectId === parseInt(e.target.parentElement.parentElement.dataset.id))

    projects.splice(Index, 1)
}


// Render a task //

function renderTask(title, description, dueDate, priorityNum, dataId, arrayIndex) {
    
    const task = document.createElement("div")
    task.classList.add("task")
    task.setAttribute("data-id", dataId)

    const taskCheckBox = document.createElement("div")

    const checkBox = document.createElement("input")
    checkBox.type = "checkbox"
    checkBox.addEventListener("change", function(e) {

        completeTask(e, arrayIndex)
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
        task.parentNode.insertBefore(createEditTaskForm(title, description, dueDate, priorityNum, dataId, arrayIndex), task.nextSibling)
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


// function and will create and display the edit Task Form //

function createEditTaskForm(title, description, dueDate, priorityNum, dataId, arrayIndex) {

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
        renderProjectTasks(arrayIndex)
    })
    
    const submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Save"
    form.addEventListener("submit", function(e) {
        e.preventDefault()
  
        let taskIndex = projects[arrayIndex].tasks.findIndex(item => item.dataId === dataId)

        projects[arrayIndex].tasks[taskIndex].name = nameInput.value
        projects[arrayIndex].tasks[taskIndex].description = descriptionInput.value
        projects[arrayIndex].tasks[taskIndex].date = dateInput.value
        projects[arrayIndex].tasks[taskIndex].priority = priority.value

        addProjectsToLocalStorage()
        renderProjectTasks(arrayIndex)

        console.log(projects)
        
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


// function which will remove task from array, add new array to storage and display new array

function completeTask(e, arrayIndex) {


    let taskIndex = projects[arrayIndex].tasks.findIndex(item => item.dataId === parseInt(e.target.parentElement.parentElement.dataset.id))

    projects[arrayIndex].tasks.splice(taskIndex, 1)
    renderProjectTasks(arrayIndex)

    addProjectsToLocalStorage()

    console.log(projects)

}


// render and display addtask button //

function renderAndDisplayAddTaskButton(projectIndex) {

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
        tasksArea.appendChild(createAddTaskForm(projectIndex))
        button.style.display = "none"
    })

    tasksArea.appendChild(button)
}



// Create addTaskForm //

function createAddTaskForm(projectIndex) {
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
    })
    
    const submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Add task"
    form.addEventListener("submit", function(e) {
        e.preventDefault()
        
        let task = new createTaskObject(name.value, description.value, dateInput.value, priority.value, Date.now())

        projects[projectIndex].tasks.push(task)
        addProjectsToLocalStorage()

        renderProjectTasks(projectIndex)  
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


// function to construct new task object // 

function createTaskObject(name, description, date, priority, dataId) {

    this.name = name
    this.description = description
    this.date = date
    this.priority = priority
    this.dataId = dataId
}


// function to add tasks array to storage 

function addProjectsToLocalStorage() {
    let TasksForStorage = JSON.stringify(projects)
    localStorage.setItem("Projects", TasksForStorage)
}


// function to load and display projectcs in storage

function loadProjectsFromStorage() {

    if (projectsTakenFromStorage) {
        projects = projectsTakenFromStorage
    }
    
    renderProjectsMenu()
    renderProjectTasks(0)
}


loadProjectsFromStorage()