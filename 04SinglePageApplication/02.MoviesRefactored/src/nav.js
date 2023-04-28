const container = document.getElementById('container');

const homePageSection = document.getElementById('home-page');
const addMovieButton = document.getElementById('add-movie-button');
const movieSection = document.getElementById('movie');
const addMovieSection = document.getElementById('add-movie');
const movieExampleSection = document.getElementById('movie-example');
const editMovieSection = document.getElementById('edit-movie');
const loginSection = document.getElementById('form-login');
const registerSection = document.getElementById('form-sign-up');
const footer = document.getElementsByTagName('footer')[0];

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const registerBtn = document.getElementById('register-btn');
const loginMsg = document.getElementById('welcome-msg');

const nav = document.getElementsByTagName('nav')[0];
nav.addEventListener('click', navigate)

export function updateButtonsVisibility() {

    const email = sessionStorage.getItem('email');

    if (email) {
        [...document.querySelectorAll('li.user')].forEach(el => el.style.display = 'inline');
        [...document.querySelectorAll('li.guest')].forEach(el => el.style.display = 'none');
        loginMsg.textContent = `Welcome, ${email}`;
        [...document.querySelectorAll('div.card-footer')].forEach(el => el.style.display = 'inline');

    } else {
        [...document.querySelectorAll('li.user')].forEach(el => el.style.display = 'none');
        [...document.querySelectorAll('li.guest')].forEach(el => el.style.display = 'inline');
        loginMsg.textContent = ``;
        [...document.querySelectorAll('div.card-footer')].forEach(el => el.style.display = 'none');
    }
}

export async function navigateView(id) {
    [...document.getElementsByTagName('section')].forEach(section => section.remove());
    container.insertBefore(await findSection(id), footer);

    updateButtonsVisibility()
}

async function findSection(id) {

    switch (id) {
        case 'add-movie': return addMovieSection;
        case 'movie-example': return movieExampleSection;
        case 'edit-movie': return editMovieSection;
        case 'form-login': return loginSection;
        case 'form-sign-up': return registerSection;
        default: location.reload();
    }
}


//-----------------------
const views = {
    'welcome-msg': null,
    'logout-btn': addMovieSection,
    'login-btn': movieExampleSection,
    'register-btn': editMovieSection
};

function navigate(event) {
    if (event.target.tagName === 'A') {
        const id = event.target.id;

    }
}

function goto(viewName, ...params){
    const view = views[viewName];
    if (typeof view === 'function') {
        view({goto}, ...params)
    }
}