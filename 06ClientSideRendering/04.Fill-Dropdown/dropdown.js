import { createItem, getAllItems } from './data.js';
import { html, render } from './node_modules/lit-html/lit-html.js'

const menu = document.getElementById('menu');
const form = document.querySelector('form');
form.addEventListener('submit', addItem);

const menuTemplate = (items) => items.map(item => html`<option value=${item._id}>${item.text}</option>`)

function addItem(e) {
    e.preventDefault();
    const newItem = e.target.querySelector('#itemText').value;
    createItem(newItem);
    updateView();
}

async function updateView() {
    const data = Object.values(await getAllItems());
    render(menuTemplate(data), menu);
}

updateView();