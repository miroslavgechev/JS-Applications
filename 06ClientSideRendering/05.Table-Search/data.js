import { get, post } from "./api.js"

const endpoints = {
    'items': '/jsonstore/advanced/table',
}

export async function getAllItems() {
    return get(endpoints.items)
}
