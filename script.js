const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const notificationContainer = document.querySelector("#notification-container");

// Get tasks from local storage or initialize empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks on page load
displayTasks();

taskForm.addEventListener("submit", addTask);

function addTask(event) {
  // Prevent form submission
  event.preventDefault();

  // Get task form values
  const taskName = document.querySelector("#task-name").value;
  const taskDesc = document.querySelector("#task-desc").value;
  const taskPriority = document.querySelector("#task-priority").value;
  const taskDueDate = document.querySelector("#task-due-date").value;

  // Create task object
  const task = {
    name: taskName,
    description: taskDesc,
    priority: taskPriority,
    dueDate: taskDueDate,
    completed: false,
  };

  // Add task to tasks array and local storage
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Clear form inputs
  taskForm.reset();

  // Display tasks
  displayTasks();

  // Show notification
  showNotification("Task Added", taskName);
}

function displayTasks() {
  // Clear existing tasks
  taskList.innerHTML = "";

  // Display tasks
  tasks.forEach(function (task, index) {
    // Create table row for task
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="background-color: #e9967a">${task.name}</td>
      <td>${task.description}</td>
      <td>${task.priority}</td>
      <td style="background-color: #c0c0c0">${task.dueDate}</td>
      <td>${task.completed ? "Completed" : "Incomplete"}</td>
      <td>
        <button class="complete-btn" data-index="${index}">${
        task.completed ? "Incomplete" : "Complete" }
        </button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </td>`;
    
    
    // CSS for Complete Button 
    const completeBtn = row.querySelector(".complete-btn");
    completeBtn.classList.add("completed-btn");
    // CSS for Delete Button 
    const deleteBtn = row.querySelector(".delete-btn");
    deleteBtn.classList.add("deleted-btn");

    // Add completed class to row if task is completed
    if (task.completed) {
      row.classList.add("completed");

    }

    // Append row to task list
    taskList.appendChild(row);
  });
}

taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("complete-btn")) {
    // Get task index
    const index = event.target.dataset.index;

    // Toggle task completed status
    tasks[index].completed = !tasks[index].completed;

    // Update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Display tasks
    displayTasks();

    // Show notification
    //showNotification("Task Completed", tasks[index].name);
    if(tasks[index].completed == true){
      alert(`Task Completed: ${tasks[index].name}`);
    }
    else{
      alert(`Task Incomplete: ${tasks[index].name}`);
    }
  } else if (event.target.classList.contains("delete-btn")) {
    // Get task index
    const index = event.target.dataset.index;

    // Remove task from tasks array
    tasks.splice(index, 1);

    // Update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Display tasks
    displayTasks();
  }
});

// function showNotification(message, taskName) {
//   // Create notification element
//   const notification = document.createElement("div");
//   notification.classList.add("notification");
//   notification.innerHTML = `
//     <p>${message}: ${taskName}</p>
//     <button class="close-btn">&times;</button>`;

//   // Append notification to container
//   notificationContainer.appendChild(notification);

//   // Hide notification after 3 seconds
//   setTimeout(function () {
//     notification.remove();
//   }, 3000);

//   // Remove notification on close button click
//   function showNotification(message, taskName) {
//     // Create notification element
//     const notification = document.createElement("div");
//     notification.classList.add("notification");
//     notification.innerHTML = `
//       <p>${message}: ${taskName}</p>
//       <button class="close-btn">&times;</button>`;

//     // Append notification to container
//     notificationContainer.appendChild(notification);

//     // Hide notification after 3 seconds
//     setTimeout(function () {
//       notification.remove();
//     }, 3000);

//     // Remove notification on close button click
//     notification.addEventListener("click", function (event) {
//       if (event.target.classList.contains("close-btn")) {
//         notification.remove();
//       }
//     });
//   } 
// }