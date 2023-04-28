import { html, render } from './node_modules/lit-html/lit-html.js'

document.getElementById('btnLoadTowns').addEventListener('click', onClick);

const root = document.getElementById('root');
const input = document.getElementById('towns');

const template = (data) => html`
<ul>
    ${data.map((item) => html`<li>${item}</li>`)}
</ul>`

function onClick(e) {
    e.preventDefault();
    const data = input
        .value
        .split(', ');

    render(template(data), root);
    input.value = '';
}