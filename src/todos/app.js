import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw'
import { renderTodos } from './usecases';
import { renderPending } from './usecases/render-pending';

const ElementIds = {
    TodoList: '.todo-list',
    NewTodoInpunt: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCount: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {


    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos);
    }

    const updatePendingTodoCount = () => {
        renderPending(ElementIds.PendingCount);
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
        updatePendingTodoCount();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInpunt);
    const todoListUL = document.querySelector(ElementIds.TodoList);
    const clearCompletedBtn = document.querySelector(ElementIds.ClearCompleted);
    const filtersLi = document.querySelectorAll(ElementIds.TodoFilters);

    //Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.key !== 'Enter') return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);

        displayTodos();
        updatePendingTodoCount();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodoStatus(element.getAttribute('data-id'));

        displayTodos();
        updatePendingTodoCount();
    })

    todoListUL.addEventListener('click', (event) => {
        const isDestroyBtn = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');

        if (!element || !isDestroyBtn) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
        updatePendingTodoCount();
    });

    clearCompletedBtn.addEventListener('click', () => {

        todoStore.deleteAllCompletedTodos();
        displayTodos();
    });

    filtersLi.forEach(element => element.addEventListener('click', (event) => {

        filtersLi.forEach(element => element.classList.remove('selected'));

        element.classList.add('selected');

        switch (event.target.text) {
            case 'Todos':
                todoStore.setFilter(Filters.All);
                break;
            case 'Pendientes':
                todoStore.setFilter(Filters.Pending);
                break;
            case 'Completados':
                todoStore.setFilter(Filters.Completed);
                break;
        }

        displayTodos();
    }));

}