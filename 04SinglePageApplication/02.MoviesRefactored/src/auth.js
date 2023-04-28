import { get, post } from "./api.js";
import { navigateView, updateButtonsVisibility } from "./nav.js";
import { clearUserData, createSubmitHandler, setUserData } from "./util.js";

const registerLink = 'http://localhost:3030/users/register';
const loginLink = 'http://localhost:3030/users/login';
const logoutLink = 'http://localhost:3030/users/logout';

const registerForm = document.getElementById('register-form');
createSubmitHandler('#register-form', registerUser);

const loginForm = document.getElementById('login-form');
createSubmitHandler('#login-form', loginUser);

export function logoutUser() {
    get(logoutLink);
    clearUserData();
    updateButtonsVisibility();
    navigateView('form-login');
}

export async function registerUser({ email, password, repeatPassword }) {

    if (!email || !password || !repeatPassword) {
        alert('All fields are required!');
        return;
    }

    if (password.length < 6) {
        alert('The password should be at least 6 characters long!');
        return;
    }

    if (password !== repeatPassword) {
        alert('The repeat password should be equal to the password!');
        return;
    }

    try {
        const data = await post(registerLink, { email, password });
        setUserData(data);
        registerForm.reset();
        updateButtonsVisibility();
        navigateView('home-page');
    } catch (err) {
        registerForm.reset();
        return;
    }
}

export async function loginUser({ email, password }) {

    try {
        const data = await post(loginLink, { email, password });
        setUserData(data);
        loginForm.reset();
        updateButtonsVisibility();
        navigateView('home-page');
    } catch (err) {
        loginForm.reset();
        return;
    }
}