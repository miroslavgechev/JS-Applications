import { html } from "../../node_modules/lit-html/lit-html.js"
import { approveMember, getAllMembersByTeamId, getTeamById, removeMember, requestMembership } from "../api/data.js";
import { getUser, getUserId } from "../middleware/getUserData.js";

const detailsTeamplate = (userId, userMembershipData, isOwner, isMember, isCandidate, hasPendingMembers, team, members) => html`
        <section id="team-home">
            <article class="layout">
                <img src=${team.logoUrl} class="team-logo left-col">
                <div class="tm-preview">
                    <h2>${team.name}</h2>
                    <p>${team.description}</p>
                    <span class="details">${team.memberCount}</span>
                    <div>
                        ${checkTeamOptions(team, userId, userMembershipData, isOwner, isMember, isCandidate)}
                    </div>
                </div>
                <div class="pad-large">
                    <h3>Members</h3>
                    <ul class="tm-members">
                        ${members.map(member => checkMembersOptions(member, userId, isOwner))}
                    </ul>
                </div>
                ${checkPendingMembersOptions(isOwner, hasPendingMembers, members, userId)}
            </article>
        </section>
`

export async function detailsView(ctx) {
    const teamId = ctx.params.id;
    const teamData = await getTeamById(teamId);
    const membersData = await getAllMembersByTeamId(teamId)

    const userId = getUserId();
    const userMembershipData = membersData.filter(member => member.user._id === userId)[0]

    const isOwner = userId === teamData._ownerId;
    const isMember = membersData.filter(member => member.user._id === userId && member.status === 'member').length > 0
    const isCandidate = membersData.filter(member => member.user._id === userId && member.status === 'pending').length > 0
    const hasPendingMembers = membersData.filter(member => member.status === 'pending').length > 0;

    ctx.render(detailsTeamplate(userId, userMembershipData, isOwner, isMember, isCandidate, hasPendingMembers, teamData, membersData));
}

function checkTeamOptions(team, userId, userMembershipData, isOwner, isMember, isCandidate) {
    if (isOwner) {
        return html`<a href="/edit/${team._id}" class="action">Edit team</a>`;
    }

    if (!isOwner && !isMember && !isCandidate && userId) {
        return html`<a href="javascript:void(0)" @click=${e => joinTeam(e, team._id)} class="action">Join team</a>`
    }

    if (!isOwner && isMember) {
        const user = getUser();
        return html`<a href="javascript:void(0)" @click=${e => revokeMembership(e, userMembershipData._id)} class="action invert">Leave team</a>`
    }

    if (isCandidate) {
        return html`Membership pending. <a href="javascript:void(0)" @click=${e => revokeMembership(e, userMembershipData._id)}>Cancel request</a>`
    }
}

function checkMembersOptions(member, userId, isOwner) {
    if (isOwner && member.user._id === userId) {
        return html`<li>${member.user.username}</li>`
    };

    if (isOwner && member.user._id !== userId && member.status === 'member') {
        return html`<li>${member.user.username}<a @click=${e => revokeMembership(e, member._id)} href="javascript:void(0)" class="tm-control action">Remove from team</a></li>`
    }

    if (!isOwner && member.status === 'member') {
        return html`<li>${member.user.username}</li>`
    }
}

function checkPendingMembersOptions(isOwner, hasPendingMembers, members, userId) {
    if (isOwner && hasPendingMembers) {
        const pendingMembers = members.filter(member => member.status === 'pending');

        return html`
        <div class="pad-large">
            <h3> Membership Requests</h3>
                <ul class="tm-members">
                    ${pendingMembers.map(member => html`
                    <li>${member.user.username}
                    <a href="javascript:void(0)" @click=${e => approveMembership(e, member._id, member.teamId)} class="tm-control action">Approve</a>
                    <a href="javascript:void(0)" @click=${e => revokeMembership(e, member._id)} class="tm-control action">Decline</a>
                    </li> `)}
                </ul>
            </div >`
    } else {
        return null
    }
}

async function joinTeam(e, teamId) {
    await requestMembership(teamId);
    return location.reload();
}

async function approveMembership(e, userId, teamId) {
    await approveMember(userId, teamId)
    return location.reload();
}

async function revokeMembership(e, userId) {
    await removeMember(userId)
    return location.reload();
}
