const todos = JSON.parse(localStorage.getItem('todos')) || [];

const render = () => {
    const todoList = document.getElementById('todo-list');
    const todosTemplate = todos.map(t => '<li>' + t + '</li>');
    todoList.innerHTML = todosTemplate.join('');

    const liElements = document.querySelectorAll('#todo-list li');
    liElements.forEach((element, i) => {
        element.addEventListener('click', () => {
            element.parentNode.removeChild(element);
            todos.splice(i, 1);
            updateTodos(todos);
            render();
        });
    });
}

const updateTodos = (todos) => {
    const todosStrings = JSON.stringify(todos);
    localStorage.setItem('todos', todosStrings);
}

window.onload = () => {
    render();
    const form = document.getElementById('todo-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const todo = document.getElementById('todo');
        const todoText = todo.value;
        todo.value = '';
        todos.push(todoText);

        updateTodos(todos);

        render();
    }
}