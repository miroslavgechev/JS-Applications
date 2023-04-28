import { deleteIdeaById, getDetailsById } from "../api/data.js";
import { htmlGenerator } from "../util/dom.js";

const section = document.getElementById('detailsView');
section.addEventListener('click', deleteIdea);

let ideaId = null;
let ctx = null;

export async function showDetails(context, id) {
    ideaId = id;
    ctx = context

    const ideaDetails = await getDetailsById(id);
    
    const user = JSON.parse(localStorage.getItem('user'));
    const isOwner = user && user._id === ideaDetails._ownerId;

    section.replaceChildren(createIdeaDetails(ideaDetails, isOwner));

    if(isOwner){
        section.querySelector('#deleteBtn').addEventListener('click', deleteIdea)
    }

    context.showSection(section);
}

function createIdeaDetails(ideaDetails, isOwner) {

    let fragment = document.createDocumentFragment();

    htmlGenerator('img', fragment, 'det-img', '', '', ideaDetails.img);

    const div = htmlGenerator('div', fragment, 'desc');
    htmlGenerator('h2', div, 'display-5', ideaDetails.title);
    htmlGenerator('p', div, 'infoType', 'Description:');
    htmlGenerator('p', div, 'idea-description', ideaDetails.description);
    
    if (isOwner) {
        const aDiv = htmlGenerator('div', fragment);
        const btn = htmlGenerator('a', aDiv, 'btn detb', 'Delete', '');
        btn.id = 'deleteBtn'
    }

    return fragment;
}

async function deleteIdea(e) {
    await deleteIdeaById(ideaId);
    ctx.goToView('/catalogue');
}