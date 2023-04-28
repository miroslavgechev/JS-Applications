import { del, get, post, put } from "./api.js"

const endpoints = {
    'all': '/data/catalog',
    'item': '/data/catalog/',
    'user': '/data/catalog?where=_ownerId%3D%22{userId}%22'
}

export async function getAllFurniture() {
    return get(endpoints.all)
}

export async function createFurniture(data) {
    return post(endpoints.all, data);
}

export async function getFurnitureDetails(id) {
    return get(endpoints.item + id);
}

export async function updateFurniture(id, data) {
    return put(endpoints.item + id, data);
}

export async function deleteFurniture(id) {
    return del(endpoints.item + id);
}

export async function getByUser(id) {
    const link = endpoints.user.replace('{userId}', id);
    return get(link);
}