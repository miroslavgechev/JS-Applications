import { navigateView, updateButtonsView } from "./nav.js";

const registerLink = 'http://localhost:3030/users/register';

const loginLink = 'http://localhost:3030/users/login';

const logoutLink = 'http://localhost:3030/users/logout';

export function logoutUser() {

    const response = fetch(logoutLink, {
        method: 'GET',
        headers: { 'X-Authorization': sessionStorage.getItem('accessToken') },
    })

    sessionStorage.clear();

    updateButtonsView();
    navigateView('form-login');
}

export async function registerUser(e) {
    e.preventDefault();

    const registerForm = document.getElementById('register-form');

    const formData = new FormData(registerForm);
    const { email, password, repeatPassword } = Object.fromEntries(formData);

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
        await submitData(email, password, registerLink);
        registerForm.reset();
        updateButtonsView();
        navigateView('home-page');
    } catch (err) {
        alert(err);
        registerForm.reset();
        return;
    }


}

export async function loginUser(e) {
    e.preventDefault();

    const loginForm = document.getElementById('login-form')

    const formData = new FormData(loginForm);
    const { email, password } = Object.fromEntries(formData);

    try {
        await submitData(email, password, loginLink);
        loginForm.reset();
        updateButtonsView();
        navigateView('home-page');
    } catch (err) {
        alert(err);
        loginForm.reset();
        return;
    }
}

async function submitData(email, password, link) {
    const response = await fetch(link, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message)
    }

    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('password', data.password);
    sessionStorage.setItem('_id', data._id);
    sessionStorage.setItem('accessToken', data.accessToken);
}