const btnLoadBooks = document.getElementById('loadBooks');
btnLoadBooks.addEventListener('click', getBooks);

const formElement = document.getElementById('bookForm');
formElement.addEventListener('submit', createEditEntry)

const formButton = document.querySelector('#bookForm button');
const formHeader = document.querySelector('#bookForm h3');
const formTitleField = document.querySelector('input[name=title]');
const formAuthorField = document.querySelector('input[name=author]');

const tableBody = document.querySelector('#booksList tbody');

async function getBooks() {

    const response = await fetch('http://localhost:3030/jsonstore/collections/books');
    const data = await response.json();

    tableBody.replaceChildren();

    Object.entries(data).forEach(([key, entry]) => {

        let tr = htmlGenerator('tr', tableBody);

        htmlGenerator('td', tr, entry.title);
        htmlGenerator('td', tr, entry.author);

        let tdAction = htmlGenerator('td', tr);

        let btnEdit = htmlGenerator('button', tdAction, 'Edit');
        btnEdit.setAttribute('data-id', key);
        btnEdit.addEventListener('click', editEntry)

        let btnDelete = htmlGenerator('button', tdAction, 'Delete');
        btnDelete.setAttribute('data-id', key);
        btnDelete.addEventListener('click', deleteEntry)
    })
}

async function createEditEntry(e) {

    e.preventDefault();

    const formData = new FormData(formElement);
    const title = formData.get('title');
    const author = formData.get('author');

    if (!title || !author) {
        alert('All fields needs to be filled!');
        return;
    }

    const body = { author, title };

    if (formButton.textContent === 'Submit') {

        const response = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

    } else if (formButton.textContent === 'Save') {

        const bookId = formButton.getAttribute('data-id');
        const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${bookId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        formButton.textContent = 'Submit';
        formButton.removeAttribute('data-id');

        formHeader.textContent = 'FORM';
    };

    formTitleField.value = '';
    formAuthorField.value = '';

    getBooks()
}

function editEntry(e) {

    e.preventDefault();

    const bookId = e.target.getAttribute('data-id');
    const bookTitle = e.target.parentElement.parentElement.getElementsByTagName('td')[0].textContent;
    const bookAuthor = e.target.parentElement.parentElement.getElementsByTagName('td')[1].textContent;

    formTitleField.value = bookTitle;
    formAuthorField.value = bookAuthor;
    formHeader.textContent = 'Edit FORM';

    formButton.textContent = 'Save';
    formButton.setAttribute('data-id', bookId);
}

async function deleteEntry(e) {

    let id = e.target.getAttribute('data-id');

    const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    getBooks();
}

function htmlGenerator(tagName, parent, text) {
    let el = document.createElement(tagName);
    el.textContent = text;

    if (parent) {
        parent.appendChild(el);
    }

    return el;
}
