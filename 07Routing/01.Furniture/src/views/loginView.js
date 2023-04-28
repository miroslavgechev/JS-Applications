import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs'
import { login } from '../api/users.js';
import { updateNav } from '../middleware/updateNav.js';

const container = document.querySelector('body div.container');

const loginUserTemplate = () => html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
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
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
    </div>
`

export function loginView() {
    render(loginUserTemplate(), container);
}

async function onSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(form);

    if (!email || !password) {
        alert('All fields are required!');
        return
    }

    await login(email, password);

    updateNav();
    page.redirect('/');
}