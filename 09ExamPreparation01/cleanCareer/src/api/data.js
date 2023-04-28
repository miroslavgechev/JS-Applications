import { del, get, post, put } from "./api.js"

const endpoints = {
    'allOffers': '/data/offers?sortBy=_createdOn%20desc',
    'offer': '/data/offers/',
    'addApplication': '/data/applications',
    'applicationCount': (offerId) => `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    'UserAppCount': (offerId, userId) => `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}

export async function getAllOffers() {
    return await get(endpoints.allOffers)
}

export async function getOfferById(id) {
    return await get(endpoints.offer + id);
}

export async function createOffer(title, imageUrl, category, description, requirements, salary) {
    return await post(endpoints.offer, { title, imageUrl, category, description, requirements, salary })
}

export async function editOffer(id, title, imageUrl, category, description, requirements, salary) {
    return await put(endpoints.offer + id, { title, imageUrl, category, description, requirements, salary })
}
export async function deleteOfferById(id) {
    return await del(endpoints.offer + id)
}

export async function addApplication(offerId) {
    return await post(endpoints.addApplication, { offerId })
}

export async function getApplicationCount(id) {
    return get(endpoints.applicationCount(id))
}

export async function getUserCountForApplication(offerId, userId){
    return get(endpoints.UserAppCount(offerId, userId));
}