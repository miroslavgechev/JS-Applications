import { del, get, post } from "./api.js"

const endpoints = {
    'ideas': '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'create': '/data/ideas',
    'ideaDetails': '/data/ideas/',
    'deleteIdea': '/data/ideas/'
}

export async function getAllIdeas (){
    return get(endpoints.ideas)
}

export async function createIdea(title, description, img){
    return post(endpoints.create, {title, description, img});
}

export async function getDetailsById(id){
    return get(endpoints.ideaDetails + id);
}

export async function deleteIdeaById(id){
    return del(endpoints.deleteIdea + id);
}