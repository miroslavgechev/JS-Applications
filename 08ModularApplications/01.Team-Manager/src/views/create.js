import page from "../../node_modules/page/page.mjs"
import { html } from "../../node_modules/lit-html/lit-html.js"
import { createTeam } from "../api/data.js";

const createTemplate = (onSubmit, errorMessage) => html `
        <section id="create">
            <article class="narrow">
                <header class="pad-med">
                    <h1>New Team</h1>
                </header>
                <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
                ${errorMessage ? html`<div class="error">${errorMessage}</div>` : null}
                    <label>Team name: <input type="text" name="name"></label>
                    <label>Logo URL: <input type="text" name="logoUrl"></label>
                    <label>Description: <textarea name="description"></textarea></label>
                    <input class="action cta" type="submit" value="Create Team">
                </form>
            </article>
        </section>
`

export async function createView(ctx){

    ctx.render(createTemplate(onSubmit))

    async function onSubmit(e){
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const { name, logoUrl, description } = Object.fromEntries(form);

        try {
            if (!name || !logoUrl || !description) {
                throw new Error('All field are required');
            };

            if (name.length < 4) {
                throw new Error('Team name must be at least four characters long');
            }

            if (logoUrl === '') {
                throw new Error('Logo URL is required');
            }

            if (description.length < 10) {
                throw new Error('Description must be at least 10 characters long');
            }

            const team = await createTeam(name, logoUrl, description);

            page.redirect(`/details/${team._id}`);
            
        } catch (error) {
            ctx.render(createTemplate(onSubmit, error.message))
        }
    }
}