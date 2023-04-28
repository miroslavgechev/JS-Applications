import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllTeamsByMemberId } from "../api/data.js";
import { getUser, getUserId } from "../middleware/getUserData.js";

const myTeamsTemplate = (teams, user) => html`
            <section id="my-teams">
            <article class="pad-med">
                <h1>My Teams</h1>
            </article>

            <article class="layout narrow">
                ${teams[0] === undefined ?
                    html `<div class="pad-med">
                        <p>You are not a member of any team yet.</p>
                        <p><a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your own
                            team.</p>
                    </div>`
                    : 
                    null
                }

                <div class=""><a href="/create" class="action cta">Create Team</a></div>
            </article>

            ${teams && teams.map(team => 
                html`        
                <article class="layout">
                    <img src=${team.team.logoUrl} class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.team.name}</h2>
                        <p>${team.team.description}</p>
                        <span class="details">${team.team.memberCount}</span>
                        <div><a href="/details/${team.team._id}" class="action">See details</a></div>
                    </div>
                </article>
            `)}
    </section>`

export async function myTeamsView(ctx) {
    const userId = getUserId();
    const teams = await getAllTeamsByMemberId(userId);
    ctx.render(myTeamsTemplate(teams, getUser()));
}