document.addEventListener('DOMContentLoaded', function() {
    loadTodos();
});

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    if (todoText) {
        const todos = getTodos();
        todos.push({ text: todoText, completed: false });
        saveTodos(todos);
        todoInput.value = '';
        renderTodos();
    }
}

function deleteTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
}

function toggleComplete(index) {
    const todos = getTodos();
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    renderTodos();
}

function getTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    const todos = getTodos();
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <div class="all">
            <div>
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
            <label style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</label>
            </div>
            <div>
            <button onclick="deleteTodo(${index})">Delete</button>
            </div>
            </div>
        `;
        todoList.appendChild(todoItem);
    });
}

// Initial render
renderTodos();
