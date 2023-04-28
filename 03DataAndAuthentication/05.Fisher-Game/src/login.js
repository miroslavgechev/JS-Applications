const loginForm = document.querySelector('form#login')
loginForm.addEventListener('submit', login);

const btnLogOut = document.querySelector('a#logout');
btnLogOut.style.display = 'none';
btnLogOut.classList.remove('active');

const btnLogIn = document.querySelector('a#login');
btnLogIn.classList.add('active');

const btnRegister = document.querySelector('a#register');
btnRegister.classList.remove('active');

const btnHome = document.querySelector('a#home');
btnHome.classList.remove('active');

const notificationField = loginForm.querySelector('p.notification');

async function login(e) {

    e.preventDefault();

    const formData = new FormData(loginForm);

    const { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
        notificationField.textContent = 'All fields are required';
        loginForm.reset();
        return;
    }

    try {

        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok || response.status !== 200) {
            loginForm.reset();
            throw new Error('Error');
        };

        const data = await response.json();

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('id', data._id);

        window.location = './index.html';

    } catch (error) {
        notificationField.textContent = 'Error logining in';
    }
}
