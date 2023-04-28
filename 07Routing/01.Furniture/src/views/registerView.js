import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs'
import { register } from '../api/users.js';
import { updateNav } from '../middleware/updateNav.js';

const container = document.querySelector('body div.container');

const registerUserTemplate = () => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class="form-control" id="rePass" type="password" name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register" />
            </div>
        </div>
    </form>
`

export function registerView() {
    render(registerUserTemplate(), container);
}

async function onSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const { email, password, rePass } = Object.fromEntries(form);

    if (!email || !password || !rePass) {
        alert('All fields are required!');
        return
    }

    if (password !== rePass) {
        alert('Passwords don\'t match!');
        return
    }

    await register(email, password);

    updateNav();
    page.redirect('/');
}