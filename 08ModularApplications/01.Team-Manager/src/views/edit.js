import page from "../../node_modules/page/page.mjs"
import { html } from "../../node_modules/lit-html/lit-html.js"
import { editTeamById, getTeamById } from "../api/data.js";

const editTemplate = (team, onSubmit, errorMessage) => html`
        <section id="edit">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Edit Team</h1>
                </header>
                <form @submit=${onSubmit} id="edit-form" class="main-form pad-large">
                ${errorMessage ? html`<div class="error">${errorMessage}</div>` : null}
                    <label>Team name: <input type="text" name="name" .value=${team.name}></label>
                    <label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}></label>
                    <label>Description: <textarea name="description" .value=${team.description}></textarea></label>
                    <input class="action cta" type="submit" value="Save Changes">
                </form>
            </article>
        </section>`

export async function editView (ctx){
    const teamId = ctx.params.id;
    const team = await getTeamById(teamId);
    
    ctx.render(editTemplate(team, onSubmit))

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

            const team = await editTeamById(teamId, name, logoUrl, description);

            page.redirect(`/details/${team._id}`);
            
        } catch (error) {
            ctx.render(editTemplate(team, onSubmit, error.message))
        }
    }
}

