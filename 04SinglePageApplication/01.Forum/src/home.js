import { createTopicHTML } from './domGenerator.js'
import { loadComments } from './comment.js'

const postUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';

export async function createNewTopic(e) {

    e.preventDefault();

    const form = e.target;

    if (e.submitter.className === 'cancel') {
        form.reset();
        return
    };

    const formData = new FormData(e.target);

    const { topicName, username, postText } = Object.fromEntries(formData);

    if (!topicName || !username || !postText) {
        alert('All fields are required!');
        return
    }

    const body = {
        topicName,
        username,
        postText,
        date: new Date
    };

    try {

        const sendNewPost = await fetch(postUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

    } catch (err) {
        alert(err.message);
    }

    form.reset();
    await loadTopics();
}

export async function loadTopics() {

    try {

        const response = await fetch(postUrl);

        if (response.status !== 200) {
            throw new Error('Error!');
        }

        const data = await response.json();

        const divTopicTitle = document.querySelector('.topic-title');
        divTopicTitle.replaceChildren();

        Object.values(data).forEach(topic => {
            const post = createTopicHTML(topic);
            post.addEventListener('click', loadComments)

        });
    } catch (err) {
        alert(err.message);
    }

}