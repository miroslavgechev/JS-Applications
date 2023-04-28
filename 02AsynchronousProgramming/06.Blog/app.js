function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
    document.getElementById('btnViewPost').addEventListener('click', viewPosts);
}

async function getPosts() {

    const selectElement = document.getElementById('posts');

    try {
        const response = await fetch('http://localhost:3030/jsonstore/blog/posts');
        if (!response.ok) {
            throw new Error('Error!');
        }

        const data = await response.json();

        Object.values(data).forEach(post => {

            const optionElement = document.createElement('option');
            optionElement.setAttribute('value', post.id);
            optionElement.textContent = post.title;

            selectElement.appendChild(optionElement);
        })
    } catch (error) {
        console.error(error.message);
    }
}

async function viewPosts() {

    const selectElement = document.getElementById('posts');
    const id = selectElement.value;
    const postTitleElement = document.getElementById('post-title');
    const postBodyElement = document.getElementById('post-body');

    const postComments = document.getElementById('post-comments');
    postComments.replaceChildren();

    try {
        const responsePosts = await fetch('http://localhost:3030/jsonstore/blog/posts');
        if (!responsePosts.ok) {
            throw new Error('Error!');
        }

        const dataPosts = await responsePosts.json();

        Object.values(dataPosts).forEach(post => {
            if (post.id === id) {
                postTitleElement.textContent = post.title;
                postBodyElement.textContent = post.body;
            };
        })

        const responseComments = await fetch(`http://localhost:3030/jsonstore/blog/comments`);
        if (!responseComments.ok) {
            throw new Error('Error!');
        }

        const dataComments = await responseComments.json();

        Object.values(dataComments).forEach(comment => {
            if (comment.postId === id) {
                const liElement = document.createElement('li');
                liElement.textContent = comment.text;

                postComments.appendChild(liElement);
            };
        })
    } catch (error) {
        console.error(error.message);
    }

}

attachEvents();