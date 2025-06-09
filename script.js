document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't save again
    }

    // Save the current tasks array to Local Storage
    function saveTasks() {
        const tasks = [];
        // Collect all task texts from the DOM list items (excluding Remove button text)
        taskList.querySelectorAll('li').forEach(li => {
            // Remove button text is inside li, so exclude it by getting only the text node content before the button
            const taskText = li.firstChild.textContent;
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task to the list and optionally save it to Local Storage
    function addTask(taskText, save = true) {
        taskText = taskText.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Remove task handler
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Update Local Storage on removal
        };

        // Append remove button and list item to the DOM
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field only if adding via user input (not on load)
        if (save) {
            taskInput.value = "";
            saveTasks(); // Update Local Storage on addition
        }
    }

    // Event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});
