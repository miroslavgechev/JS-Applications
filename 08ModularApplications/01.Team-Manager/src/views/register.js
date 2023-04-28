import page from "../../node_modules/page/page.mjs"
import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api/users.js";

const registerTemplate = (onSubmit, errorMessage) => html`
        <section id="register">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Register</h1>
                </header>
                <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
                    ${errorMessage ? html`<div class="error">${errorMessage}</div>` : null}
                    <label>E-mail: <input type="text" name="email"></label>
                    <label>Username: <input type="text" name="username"></label>
                    <label>Password: <input type="password" name="password"></label>
                    <label>Repeat: <input type="password" name="repass"></label>
                    <input class="action cta" type="submit" value="Create Account">
                </form>
                <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
                </footer>
            </article>
        </section>
`

export async function registerView(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const { email, username, password, repass } = Object.fromEntries(form);

        try {
            if (!email || !username || !password || !repass) {
                throw new Error('All field are required');
            };

            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ig;

            if (!email.match(emailRegex)) {
                throw new Error('Email is not valid');
            }

            if (username.length < 3) {
                throw new Error('Username must be at least three characters long');
            }

            if (password !== repass) {
                throw new Error('Passwords don\'t match');
            }

            if (password.length < 3) {
                throw new Error('Username must be at least three characters long');
            }

            await register(email, username, password);

            page.redirect('/');
            
        } catch (error) {
            ctx.render(registerTemplate(onSubmit, error.message))
        }
    }
}


