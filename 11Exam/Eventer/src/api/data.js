import { del, get, post, put } from "./api.js"

const endpoints = {
    'allEvents': '/data/events?sortBy=_createdOn%20desc',
    'eventById': '/data/events/',
    'createEvent': '/data/events',
    'addPersonToEvent': '/data/going',
    'eventCount': (eventId) => `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    'eventsGoing': (eventId, userId) => `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getAllEvents() {
    return await get(endpoints.allEvents);
}

export async function getEventById(id) {
    return await get(endpoints.eventById + id);
}

export async function createEvent(name, imageUrl, category, description, date) {
    return await post(endpoints.createEvent, { name, imageUrl, category, description, date })
}

export async function editEventById(id, name, imageUrl, category, description, date) {
    return await put(endpoints.eventById + id, { name, imageUrl, category, description, date })
}

export async function deleteEventById(id) {
    return await del(endpoints.eventById + id);
}

export async function addPersonToEvent(eventId) {
    return await post(endpoints.addPersonToEvent, { eventId });
}

export async function getEventCountById(eventId) {
    return await get(endpoints.eventCount(eventId));
}

export async function getEventGoingsByUserId(eventId, userId) {
    return await get(endpoints.eventsGoing(eventId, userId));
}