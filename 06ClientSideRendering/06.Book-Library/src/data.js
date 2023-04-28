import { del, get, post, put } from "./api.js"

const endpoints = {
    'get': '/jsonstore/collections/books/',
    'create': '/jsonstore/collections/books'
}

export async function getAllBooks (){
    return get(endpoints.get);
}

export async function getBookById(id){
    return get(endpoints.get + id);
}

export async function createBook(title, author){
    return post(endpoints.create, {author, title});
}

export async function updateBook(title, author, id){
    return put(endpoints.get + id, {author, title})
}

export async function deleteBookById(id){
    return del(endpoints.get + id);
}