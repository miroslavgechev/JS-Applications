import { getAllIdeas } from "../api/data.js";
import { htmlGenerator } from "../util/dom.js";

const section = document.getElementById('dashboard-holder');
section.addEventListener('click', onDetailsClick)

let ctx = null;

export async function showCatalogue(context) {
    ctx = context;
    context.showSection(section);
    const ideas = await getAllIdeas();

    if (ideas.length === 0) {
        section.replaceChildren(createBlankMessage());
    } else {
        section.replaceChildren(...ideas.map(createIdeaPreview));
    }
}

function createIdeaPreview(idea) {

    const parent = htmlGenerator('div', '', 'card overflow-hidden current-card details');
    parent.style.width = '20rem';
    parent.style.height = '18rem';
    parent.setAttribute('data-id', idea._id);

    const div = htmlGenerator('div', parent, 'card-body');
    htmlGenerator('p', div, 'card-text', idea.title);

    const img = htmlGenerator('img', parent, 'card-image', '', '', idea.img);
    img.setAttribute('alt', 'Card image cap');

    const button = htmlGenerator('a', parent, 'btn', 'Details', '/details');
    button.setAttribute('data-id', idea._id);

    return parent;
}

function createBlankMessage() {
    return htmlGenerator('h1', '', '', 'No ideas yet! Be the first one :)');
}

function onDetailsClick(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const id = e.target.dataset.id;

        if (id) {
            ctx.goToView('/details', id);
        }
    }
}
