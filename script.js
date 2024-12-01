
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasks');


let tasks = [];


function addTask() {
    const taskText = taskInput.value.trim();
    const taskDueDate = taskDate.value;

    if (taskText !== '') {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            dueDate: taskDueDate || ''
        };
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
        taskDate.value = '';
    }
}


function renderTasks() {
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.classList.toggle('completed', task.completed);

        const taskText = document.createElement('span');
        taskText.textContent = `${task.text} ${task.dueDate ? `- Due: ${new Date(task.dueDate).toLocaleString()}` : ''}`;

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

       
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleComplete(task.id);
        taskActions.appendChild(completeBtn);

        
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(task.id);
        taskActions.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);
        taskActions.appendChild(deleteBtn);

        taskElement.appendChild(taskText);
        taskElement.appendChild(taskActions);

        tasksList.appendChild(taskElement);
    });
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    renderTasks();
}


function editTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
        taskInput.value = taskToEdit.text;
        taskDate.value = taskToEdit.dueDate;
        deleteTask(id);
    }
}


function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}


addTaskBtn.addEventListener('click', addTask);


renderTasks();
