import { del, get, post, put } from "./api.js"

const endpoints = {
    'all': '/data/teams/',
    'allMembers': '/data/members?where=status%3D%22member%22',
    'allMembersByTeam': '/data/members?where=teamId%3D%22{teamId}%22&load=user%3D_ownerId%3Ausers',
    'teamsByMember': '/data/members?where=_ownerId%3D%22{userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams',
    'manageMember': '/data/members/'
}

export async function getAllTeams() {
    const teams = await get(endpoints.all);
    const members = await getAllMembers();
    teams.forEach(team => team.memberCount = members.filter(member => member.teamId === team._id).length);

    return teams
}

export async function getAllMembers() {
    return get(endpoints.allMembers);
}

export async function createTeam(name, logoUrl, description) {
    const team = await post(endpoints.all, { name, logoUrl, description });
    const user = await requestMembership(team._id);
    await approveMember(user._id, team._id);
    return team
}

export async function getTeamById(teamId) {
    let team = await get(endpoints.all + teamId);
    const members = await getAllMembersByTeamId(teamId)
    team.memberCount = members.filter(member => member.status === 'member').length;
    return team;
}

export async function editTeamById(teamId, name, logoUrl, description) {
    return put(endpoints.all + teamId, { name, logoUrl, description });
}

export async function getAllMembersByTeamId(teamId) {
    return get(endpoints.allMembersByTeam.replace('{teamId}', teamId))
}

export async function getAllTeamsByMemberId(userId) {
        const teams = await get(endpoints.teamsByMember.replace('{userId}', userId))
        const members = await getAllMembers();
        teams.forEach(team => team.team.memberCount = members.filter(member => member.teamId === team.team._id).length);

        return teams
    }

export async function requestMembership(teamId) {
    return post(endpoints.manageMember, { teamId })
}

export async function approveMember(userId, teamId) {
    return put(endpoints.manageMember + userId, { teamId, 'status': 'member' });
}

export async function removeMember(userId) {
    return del(endpoints.manageMember + userId)
}