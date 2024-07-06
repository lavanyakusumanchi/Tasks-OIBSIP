document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const pendingList = document.getElementById('pendingList');
    const completedList = document.getElementById('completedList');
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText === '') return;
      const currentDate = new Date();
      const dateString = currentDate.toLocaleDateString();
      const timeString = currentDate.toLocaleTimeString();
      const taskItem = document.createElement('li');
      taskItem.textContent = `${taskText} - Added on ${dateString} at ${timeString}`;
      const completeButton = createButton('Complete', 'complete-btn', function() {
        toggleComplete(taskItem, completeButton);
      });
      const editButton = createButton('Edit', 'edit-btn', function() {
        editTask(taskItem, taskText);
      });
      const deleteButton = createButton('Delete', 'delete-btn', function() {
        taskItem.remove();
      });
      taskItem.appendChild(completeButton);
      taskItem.appendChild(editButton);
      taskItem.appendChild(deleteButton);
      pendingList.appendChild(taskItem);
      taskInput.value = '';
    });
    function createButton(text, className, clickHandler) {
      const button = document.createElement('button');
      button.textContent = text;
      button.classList.add(className); // Add the specified class
      button.addEventListener('click', clickHandler);
      return button;
    }
    function toggleComplete(taskItem, completeButton) {
      taskItem.classList.toggle('completed');
      if (taskItem.classList.contains('completed')) {
        completedList.appendChild(taskItem);
        completeButton.textContent = 'Restore';
      } else {
        pendingList.appendChild(taskItem);
        completeButton.textContent = 'Complete';
      }
    }
    function editTask(taskItem, originalText) {
      const newText = prompt('Edit task:', originalText);
      if (newText !== null && newText.trim() !== '') {
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString();
        const timeString = currentDate.toLocaleTimeString();
        taskItem.textContent = `${newText} - Edited on ${dateString} at ${timeString}`;
        taskItem.querySelectorAll('button').forEach(button => button.remove());
        const completeButton = createButton('Complete', 'complete-btn', function() {
          toggleComplete(taskItem, completeButton);
        });
        const editButton = createButton('Edit', 'edit-btn', function() {
          editTask(taskItem, newText);
        });
        const deleteButton = createButton('Delete', 'delete-btn', function() {
          taskItem.remove();
        });
  
        taskItem.appendChild(completeButton);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
      }
    }
    const markAllCompletedButton = document.createElement('button');
    markAllCompletedButton.textContent = 'Mark All as Completed';
    markAllCompletedButton.classList.add('complete-all-btn'); 
    markAllCompletedButton.addEventListener('click', function() {
      const pendingTasks = pendingList.querySelectorAll('li');
      pendingTasks.forEach(taskItem => {
        if (!taskItem.classList.contains('completed')) {
          const completeButton = taskItem.querySelector('.complete-btn'); 
          toggleComplete(taskItem, completeButton);
        }
      });
    });
    document.body.insertBefore(markAllCompletedButton, document.querySelector('h2'));
  });
  