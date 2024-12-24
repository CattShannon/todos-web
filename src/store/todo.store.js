import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Graveyard'),
        new Todo('Strider'),
        new Todo('Trigger'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore (u.u)');
}

const loadStore = () => {

    const storageItem = localStorage.getItem('state');

    if (!storageItem) return;

    const { todos = [], filter = Filters.All } = JSON.parse(storageItem);

    state.todos = todos.map( rawTodo => Object.assign(new Todo(), rawTodo) );
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.getDone);

        case Filters.Pending:
            return state.todos.filter(todo => !todo.getDone);

        default:
            throw new Error(`Option ${filter} is not valid.`)
    }
}

/**
 * 
 * @param {String} descrption 
 */
const addTodo = (descrption) => {
    if (!descrption) throw new Error('Description is required.');

    state.todos.push(new Todo(descrption));
    saveStateToLocalStorage();
}

const toggleTodoStatus = (todoId) => {//Este fragmento de codigo no es eficiente para cargas grandes
    state.todos = state.todos.map(todo => {
        if (todo.getId === todoId) {
            todo.done = !todo.getDone;
            return todo;
        }
        return todo;
    })
    saveStateToLocalStorage();
}


const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.getId !== todoId);
    saveStateToLocalStorage();
}

const deleteAllCompletedTodos = () => {
    state.todos = state.todos.filter(todo => !todo.getDone);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {

    if (!Filters[newFilter]) throw new Error(`Filter ${newFilter} is not allowed.`);

    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteAllCompletedTodos,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodoStatus,
}
