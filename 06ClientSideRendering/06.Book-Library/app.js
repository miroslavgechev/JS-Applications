import { createBook, deleteBookById, getAllBooks, getBookById, updateBook } from './src/data.js';
import { render } from './node_modules/lit-html/lit-html.js';
import { tableRowTemplate } from './templates/tableRowTemplate.js';
import { editFormTemplate } from './templates/editFormTemplate.js';
import { addFormTemplate } from './templates/addFormTemplate.js';

const body = document.querySelector('body');
const tBody = document.querySelector('tbody');

const btn = document.querySelector('#loadBooks');
btn.addEventListener('click', updateView);

const ctx = {
    addBook,
    editBook,
    editBookFormFill,
    deleteBook
}

async function updateView() {
    const data = Object.entries(await getAllBooks());
    render(tableRowTemplate(data, ctx), tBody);
    render(addFormTemplate(ctx), body);
}

async function addBook(e) {
    e.preventDefault();
    const formData = new FormData(e.target.parentElement);
    const { title, author } = Object.fromEntries(formData);

    if (!title || !author) {
        alert('All fields are required!');
        return
    };

    await createBook(title, author);
    btn.click();
}

async function editBookFormFill(e) {
    const bookId = e.target.getAttribute('data-id');
    const data = await getBookById(bookId);
    render(editFormTemplate(data, ctx, bookId), body)
}

async function editBook(e) {
    e.preventDefault()
    const formData = new FormData(e.target.parentElement);
    const { title, author } = Object.fromEntries(formData);

    if (!title || !author) {
        alert('All fields are required!');
        return
    };
    
    const bookId = e.target.parentElement.getAttribute('data-id');

    await updateBook(title, author, bookId);
    btn.click();
}

async function deleteBook(e) {
    e.preventDefault();
    const bookId = e.target.getAttribute('data-id');
    await deleteBookById(bookId);
    btn.click();
}