const registerForm = document.querySelector('form#register')
registerForm.addEventListener('submit', register);

const btnLogOut = document.querySelector('a#logout');
btnLogOut.style.display = 'none';
btnLogOut.classList.remove('active');

const btnLogIn = document.querySelector('a#login');
btnLogIn.classList.remove('active');

const btnRegister = document.querySelector('a#register');
btnRegister.classList.add('active');

const btnHome = document.querySelector('a#home');
btnHome.classList.remove('active');

const notificationField = registerForm.querySelector('p.notification');

async function register(e) {

    e.preventDefault();

    const formData = new FormData(registerForm);

    const { email, password, rePass } = Object.fromEntries(formData);

    if (!email || !password || !rePass) {
        notificationField.textContent = 'All fields are required';
        return;
    }

    if (password !== rePass) {
        notificationField.textContent = 'Passwords do not match!'
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json();

        if (!response.ok || response.status !== 200) {
            loginForm.reset();
            throw new Error('Error');
        };

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('id', data._id);

        window.location = './index.html';
    } catch (error) {
        notificationField.textContent = 'Error registering'
    }
}

