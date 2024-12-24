import { Todo } from "../models/todo.model";

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHtml = (todo) => {
    if (!todo) throw new Error('Todo object is required');

    const html = `
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.getDone ? 'checked' : ''}>
                <label>${ todo.getDescription }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
    `;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', todo.getId);

    if(todo.getDone)
        liElement.classList.add('completed');

    return liElement;
}