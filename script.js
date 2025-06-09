// Wait for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task to the list
  function addTask() {
    // Get and trim the task input value
    const taskText = taskInput.value.trim();

    // Check if input is empty
    if (taskText === "") {
      alert("Please enter a task at the task input field.");
      return;
    }

    // Create a new <li> element for the task
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create the "Remove" button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    // Add functionality to remove the task
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append the remove button to the task item
    li.appendChild(removeBtn);

    // Append the task item to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
  }

  // Attach event listener to the Add Task button
  addButton.addEventListener('click', addTask);

  // Attach event listener to allow adding tasks by pressing "Enter"
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // OPTIONAL: Run logic on DOMContentLoaded (if future setup needed)
  // Example: loadTasks(); // This can be for localStorage in future
});
