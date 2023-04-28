import { createMainComment, createUserComments } from './domGenerator.js'

const main = document.querySelector('main');
const sectionComments = document.querySelector('section#detailedView');
const sectionCommentsDiv = document.querySelector('section#detailedView div.comment');
const divThemeContent = document.querySelector('.theme-content');


const divNewComment = document.querySelector('section#detailedView div.answer-comment');

const postUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const commentsUrl = 'http://localhost:3030/jsonstore/collections/myboard/comments';

let topicId;

export async function loadComments(e) {

    if (e) {
        topicId = e.currentTarget.id;
    };

    try {

        main.replaceChildren(sectionComments);

        const response = await fetch(postUrl);

        if (response.status !== 200) {
            throw new Error('Error fetching data!');
        }

        const data = await response.json();

        const topic = Object.values(data).filter(post => post._id === topicId);

        createMainComment(topic[0]);

        await loadUserComments(topicId);

        divThemeContent.appendChild(divNewComment);

    } catch (err) {
        alert(err.message)
    }
}

async function loadUserComments(id) {

    const response = await fetch(commentsUrl);

    if (response.status !== 200) {
        throw new Error('Error fetching data!');
    }

    const data = await response.json();

    const comments = Object.values(data).filter(comment => comment.topicId === id);

    if (comments.length === 0) {
        return;
    }

    comments.forEach(comment => createUserComments(comment));

    return
}

export async function addNewComment(e) {

    e.preventDefault();

    const formData = new FormData(e.target);

    const { username, postText } = Object.fromEntries(formData)

    if (!username || !postText) {
        alert('All fields are required!');
        return;
    }

    const body = { username, postText, topicId, date: new Date };

    const response = await fetch(commentsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (response.status !== 200) {
        throw new Error('Error fetching data!');
    }

    e.target.reset();

    await loadComments();
}