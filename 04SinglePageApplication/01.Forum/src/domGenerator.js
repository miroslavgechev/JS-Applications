
const divTopicTitle = document.querySelector('.topic-title');
const sectionComments = document.querySelector('section#detailedView');
const divComment = document.querySelector('section#detailedView div.comment');
const divNewComment = document.querySelector('section#detailedView div.answer-comment');

const divThemeContent = document.querySelector('.theme-content');
const divThemeTitle = document.querySelector('.theme-title');

export function createTopicHTML(topicData) {

    const divContainer = htmlGenerator('div', divTopicTitle, '', 'topic-container');
    divContainer.id = topicData._id;

    const divNameWrapper = htmlGenerator('div', divContainer, '', 'topic-name-wrapper');

    const divTopicName = htmlGenerator('div', divNameWrapper, '', 'topic-name');

    const aNormal = htmlGenerator('a', divTopicName, '', 'normal', '#');
    const h2 = htmlGenerator('h2', aNormal, topicData.topicName);

    const divColumns = htmlGenerator('div', divTopicName, '', 'columns');
    const divDateAndNickName = htmlGenerator('div', divColumns);

    const pDate = htmlGenerator('p', divDateAndNickName);
    pDate.innerHTML = `Date: <time>${topicData.date}</time>`;

    const divNickName = htmlGenerator('div', divDateAndNickName,'', 'nick-name');
    
    const pNickName = htmlGenerator('p', divNickName);
    pNickName.innerHTML = `<p>Username: <span>${topicData.username}</span></p>`;

    return divContainer;
}

export function createMainComment(topicData) {

    divNewComment.remove();
    divComment.replaceChildren();

    ////
    
    //sectionComments.replaceChildren(divThemeContent);

    divThemeTitle.replaceChildren();
    const divThemeNameWrapper = htmlGenerator('div', divThemeTitle,'','theme-name-wrapper');
    
    const divThemeName = htmlGenerator ('div', divThemeNameWrapper,'', 'theme-name');
    
    const h2 = htmlGenerator('h2', divThemeName, topicData.topicName);
////

    const divHeader = htmlGenerator('div', divComment, '', 'header');

    const img = htmlGenerator('img', divHeader);
    img.setAttribute('src', './static/profile.png');
    img.setAttribute('alt', 'avatar');

    const pUsername = htmlGenerator('p', divHeader);
    pUsername.innerHTML = `<span>${topicData.username}</span> posted on <time>${topicData.date}</time>`

    const pPost = htmlGenerator('p', divHeader, topicData.postText, 'post-content');
}

export function createUserComments(comment){
    divNewComment.remove();

    const divUserComment = htmlGenerator('div', divComment, '', '', '', 'user-comment');

    const divTopicNameWrapper = htmlGenerator('div', divUserComment,'', 'topic-name-wrapper');

    const divTopicName = htmlGenerator('div', divTopicNameWrapper, '', 'topic-name');

    const pUsername = htmlGenerator('p', divTopicName);
    pUsername.innerHTML = `<strong>${comment.username}</strong> commented on <time>${comment.date}</time>`;

    const divPostContent = htmlGenerator('div', divTopicName,'','post-content');
    const pPostContent = htmlGenerator('p', divPostContent, comment.postText);
}

function htmlGenerator(tagName, parent, textContent, className, href, id) {

    let el = document.createElement(tagName);
    el.textContent = textContent;

    if (parent) {
        parent.appendChild(el);
    }

    if (href) {
        el.setAttribute('href', href);
    }

    if (className) {
        el.classList.add(className);
    }

    if (id) {
        el.setAttribute('id', id);
    }

    return el;
}