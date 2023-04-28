import { get, post } from "./api.js"

const endpoints = {
    'items': '/jsonstore/advanced/dropdown',
}

export async function getAllItems() {
    return get(endpoints.items)
}

export async function createItem(text) {
    return post(endpoints.items, { text });
}