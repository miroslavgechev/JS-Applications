import page from "../../node_modules/page/page.mjs"
import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../api/users.js";

const loginTemplate = (onSubmit, errorMessage) => html`
        <section id="login">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Login</h1>
                </header>
                <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
                ${errorMessage ? html`<div class="error">${errorMessage}</div>` : null}
                    <label>E-mail: <input type="text" name="email"></label>
                    <label>Password: <input type="password" name="password"></label>
                    <input class="action cta" type="submit" value="Sign In">
                </form>
                <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
                </footer>
            </article>
        </section>
`

export async function loginView(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(form);

        try {
            if (!email || !password) {
                throw new Error('All field are required');
            };

            await login(email, password);
            page.redirect('/my-teams');

        } catch (error) {
            ctx.render(loginTemplate(onSubmit, error.message))
        }
    }
}


