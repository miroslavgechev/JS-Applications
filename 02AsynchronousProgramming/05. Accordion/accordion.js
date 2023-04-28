async function solution() {

    const mainSection = document.getElementById('main');

    try {
        const responseArticles = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
        if (!responseArticles.ok) {
            throw new Error(error);
        }

        const dataArticles = await responseArticles.json();

        Object.values(dataArticles).forEach(article => {

            const mainDiv = htmlGenerator('div', mainSection, 'accordion');

            const divHeading = htmlGenerator('div', mainDiv, 'head');
            const span = htmlGenerator('span', divHeading, '', '', article.title);
            const button = htmlGenerator('button', divHeading, 'button', article._id, 'More');

            const divExtra = htmlGenerator('div', mainDiv, 'extra');
            divExtra.style.display = 'none';

            const p = htmlGenerator('p', divExtra);

            button.addEventListener('click', getContent)
        })

    } catch (error) {
        console.error(error.message);
    }
}

async function getContent(e) {

    const id = e.target.id;
    const divExtra = e.target.parentNode.parentNode.querySelector(".extra");
    const p = divExtra.querySelector('p');

    try {

        const responseContent = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
        if (!responseContent.ok) {
            throw new Error('Error');
        }
        const dataContent = await responseContent.json();

        if (e.target.textContent === 'More') {
            e.target.textContent = 'Less';
            p.textContent = dataContent.content;
            divExtra.style.display = 'block';

        } else {
            e.target.textContent = 'More';
            divExtra.style.display = 'none';
        }
        
    } catch (error) {
        console.error(error.message);
    }
}

function htmlGenerator(tagName, parent, className, id, textContent) {

    let el = document.createElement(tagName);
    el.textContent = textContent;

    if (parent) {
        parent.appendChild(el);
    }

    if (className) {
        el.classList.add(className);
    }

    if (id) {
        el.id = id;
    }

    return el;
}

solution()