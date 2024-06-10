document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.querySelector('.todo-input');
  const addButton = document.querySelector('.add-button');
  const todosContainer = document.querySelector('.todos');

  const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todosContainer.innerHTML = '';
    todos.forEach(todo => {
      addTodoToDOM(todo);
    });
  };

  const saveTodos = () => {
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(todoItem => {
      todos.push({
        text: todoItem.querySelector('.task').textContent,
        completed: todoItem.classList.contains('completed')
      });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const addTodoToDOM = (todo) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    if (todo.completed) todoItem.classList.add('completed');
    todoItem.innerHTML = `
      <span class="task">${todo.text}</span>
      <input class="edit-input" type="text" value="${todo.text}">
      <button class="edit-button"><i class="fa fa-pencil"></i></button>
      <button class="delete-button"><i class="fa fa-trash"></i></button>
    `;
    todosContainer.appendChild(todoItem);

    const editButton = todoItem.querySelector('.edit-button');
    const deleteButton = todoItem.querySelector('.delete-button');
    const editInput = todoItem.querySelector('.edit-input');
    const taskSpan = todoItem.querySelector('.task');

    editButton.addEventListener('click', () => {
      if (todoItem.classList.contains('editing')) {
        taskSpan.textContent = editInput.value;
        todoItem.classList.remove('editing');
        saveTodos();
      } else {
        todoItem.classList.add('editing');
        editInput.style.display = 'block';
        editInput.focus();
      }
    });

    deleteButton.addEventListener('click', () => {
      todosContainer.removeChild(todoItem);
      saveTodos();
    });

    taskSpan.addEventListener('click', () => {
      todoItem.classList.toggle('completed');
      saveTodos();
    });
  };

  addButton.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText !== '') {
      const todo = { text: taskText, completed: false };
      addTodoToDOM(todo);
      saveTodos();
      todoInput.value = '';
    }
  });

  loadTodos();
});
