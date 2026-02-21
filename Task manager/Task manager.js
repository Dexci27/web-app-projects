function enterTaskInformation() {
//selects the container which contains the elements for entering task information
    var container = document.getElementById("smallContainer");
        
// creates an input for entering the task name
     var input = document.createElement("input");
     input.placeholder = "Enter task name";
     input.id = "taskName";
        
// creates a button to click on in order to add the task
    var button = document.createElement("button");
    button.innerHTML = "Create task";
    button.onclick = addTask;
        
// adds the elements only if there is no other element in the container, therefore prevents having multiple task information entering
    if(container.innerHTML === "") {
        container.appendChild(input);
        container.appendChild(button);
    };
        
};
    
    
function addTask() {
// select the main divs 
    var bigContainer = document.getElementById("bigContainer");
    var taskContainer = document.createElement("div");
    taskContainer.classList.add("taskContainer")
    taskContainersList.push(taskContainer);
        
// create a checkbox and add the function to cross the task when the checkbox is checked 
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function () {
        crossTask(this.parentElement);
    }
        
 //create a p element that will contain the name of the task  
    var task = document.createElement("p");
    task.classList.add("task");
    var taskName = document.getElementById("taskName").value;
    if (taskList.includes(taskName)) {
        var p = document.getElementById("test");
        p.innerHTML = "There is already a task with this name, please change the name to continue.";
        return 
    }
    taskList.push(taskName);
    task.innerHTML = taskList[taskList.length-1];
        
// create edit and a delete buttons
    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function () {
        editTask(this.parentElement);
    }
        
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
        deleteTask(this.parentElement);
    }
        
// make a list of the elements that a typical task will contain in order to make it easier to add inside the div
    var elementsList = [checkbox, task, editButton, deleteButton];
        
// add the elements contained in a task inside of a div and add each div inside a bigger div
    elementsList.forEach(element => taskContainer.appendChild(element));
    bigContainer.appendChild(taskContainer);
        
// add the id of task, the checkbox and the taskContainer
       if (taskIdList.length > 0) {
           taskContainer.id = taskIdList[taskIdList.length-1] + 1;

           task.id = "task" + taskContainer.id;
           taskIdList.push(taskIdList[taskIdList.length-1] + 1);
           
       } else {
           taskIdList.push(1);
           taskContainer.id = taskIdList[taskIdList.length-1];
           task.id = "task" + taskContainer.id;
       }
        
// remove the space for adding the task information after clicking on the button
    var smallContainer = document.getElementById("smallContainer");
    smallContainer.innerHTML = "";

}
    
    
function crossTask(container) {
// select the task and crosses the content of the task when the checkbox is checked
    var task = document.getElementById("task" + container.id);
    task.classList.toggle("cross");
}
    
    
function deleteTask(container) {
// removes the deleted task from it's container
    var bigContainer = document.getElementById("bigContainer");
    var taskContainer = document.getElementById(container.id);
    bigContainer.removeChild(taskContainer);
        
// removes the removed task from the task list and the taskContainersList
    taskList.splice((container.id*1)-1, 1);
    taskContainersList.splice((container.id*1)-1, 1);
// removes the removed task's id 
    taskIdList.pop();
        
// Resets the id
    taskIdList = taskIdList.map(function (element, index) {return element = index+1});
    
// puts the reset id as id of the task containers
    var div = document.getElementsByClassName("taskContainer");
    var task = document.getElementsByClassName("task")
    var LTask = []
    var divList = [];

    for (var i=0; i<div.length; i++) {
        div[i].id = taskIdList[i];
        task[i].id = "task" + taskIdList[i];
    }
    for (var i=0; i<task.length; i++) {
        LTask.push(task[i]);
    }
    for (var i=0; i<div.length; i++) {
        divList.push(div[i].id);
    }
    
        
    const containersId = LTask.map(function (element) {return element.id});
    
        
}
    
    
function editTask(container) {
// select the task container and the name of the task
    var taskContainer = document.getElementById(container.id);
    var taskName = document.getElementById("task" + container.id).innerHTML;
    
// creates an input that will enable the editing of the task name
    var inputEdit = document.createElement("input");
    inputEdit.value = taskName;
        
// creates a cancel and a confirm button to either cancel the edit or confirm the edit
    var cancelButton = document.createElement("button");
    cancelButton.innerHTML = "Cancel";
    cancelButton.onclick = function () {
         cancelEdit(taskName, taskContainer);
    };
        
    var confirmButton = document.createElement("button");
    confirmButton.innerHTML = "Confirm";
    confirmButton.onclick = function () {
        confirmEdit(inputEdit, taskContainer);
    };
        
// removes everything in the taskContainer and adds the task editing elements
    taskContainer.innerHTML = "";
    taskContainer.appendChild(inputEdit);
    taskContainer.appendChild(cancelButton);
    taskContainer.appendChild(confirmButton);
}
    
    
function confirmEdit(inputEdit, taskContainer) {
// selects the new content of the input and puts it in a variable
    var newTaskName = inputEdit.value;
    
// creates a checkbox
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox" + taskContainer.id;
    checkbox.onclick = function () {
        crossTask(taskContainer);
    };
        
// creates a paragraph for the task name with the content of the paragraph being the new value of the input   
    var task = document.createElement("p");
    task.innerHTML = newTaskName
    task.id = "task" + taskContainer.id;
    task.classList.add("task");
    if (taskList.includes(task.innerHTML)) {
        var p = document.getElementById("test");
        p.innerHTML = "There is already a task with this name, please change the name to continue.";
        return 
    }
    taskList[(taskContainer.id*1)-1] = task.innerHTML;
    
// creates an edit and a delete button
    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function () {
        editTask(taskContainer);
    };
        
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
        deleteTask(taskContainer);
    };
    
// add all the elements created in a list to make it easier to append inside the container
     var elementsList = [checkbox, task, editButton, deleteButton];
 // removes all the content of the container
    taskContainer.innerHTML = "";
// add the tasks elements to the taskContainer
    elementsList.forEach(element => taskContainer.appendChild(element));


    var containersId = taskContainersList.map(function name(element) {return element.id});
};
    
    
function cancelEdit(taskName, taskContainer) {
    
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox" + taskContainer.id;
    checkbox.onclick = function () {
        crossTask(taskContainer);
    };
    
    var task = document.createElement("p");
    task.innerHTML = taskName;
    task.id = "task" + taskContainer.id;
    task.classList.add("task");
    taskList[(taskContainer.id*1)-1] = task.innerHTML;
    
    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function () {
        editTask(taskContainer);
    };
        
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
        deleteTask(taskContainer);
    };
    
    var elementsList = [checkbox, task, editButton, deleteButton];
    taskContainer.innerHTML = "";
    elementsList.forEach(element => taskContainer.appendChild(element));
    
    var containersId = taskContainersList.map(function name(element) {return element.id});
};
    
    
// these are the lists for task names, taskContainers and task id
var taskList = []
var taskContainersList = [];
var taskIdList = [];