import { addMovie } from "./viewMovieAdd.js";
import { logoutUser, loginUser, registerUser } from "./auth.js";
import { updateButtonsView, navigateView } from "./nav.js";
import { constructHomePage } from "./viewHome.js";

window.addEventListener('load', showHome);

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

const loginMsg = document.getElementById('welcome-msg');

let anchorNav = document.querySelector('a.navbar-brand');
anchorNav.setAttribute('href', 'javascript:void(0)');
anchorNav.addEventListener('click', showHome);

const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', () => navigateView('form-login'));

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', logoutUser);

const registerBtn = document.getElementById('register-btn');
registerBtn.addEventListener('click', () => navigateView('form-sign-up'));

const addMovieBtn = document.querySelector('section a.btn-warning');
addMovieBtn.addEventListener('click', () => navigateView('add-movie'));

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', loginUser);

const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', registerUser);

const addMovieForm = document.getElementById('add-movie-form');
addMovieForm.addEventListener('submit', addMovie)

async function showHome() {
    [...document.getElementsByTagName('section')].forEach(section => section.remove());
    container.insertBefore(await constructHomePage(homePageSection, movieSection, addMovieButton), footer);

    updateButtonsView()
}

updateButtonsView();
