import { createNewTopic, loadTopics } from './home.js';
import { addNewComment } from './comment.js'

window.addEventListener('load', loadHomePage);

const btnHome = document.querySelector('nav a');
btnHome.addEventListener('click', loadHomePage)

const main = document.querySelector('main');

const homeSection = document.getElementById('homeView');

const formPost = document.querySelector('section#homeView form');
formPost.addEventListener('submit', createNewTopic)

const formComments = document.querySelector('div.answer-comment form');
formComments.addEventListener('submit', addNewComment);

async function loadHomePage() {
    main.replaceChildren(homeSection);
    await loadTopics()
}
