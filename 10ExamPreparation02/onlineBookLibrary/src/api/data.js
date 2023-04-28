import { del, get, post, put } from "./api.js"

const endpoints = {
    'allBooks': '/data/books?sortBy=_createdOn%20desc',
    'addBook': '/data/books',
    'getBook': '/data/books/',
    'booksByUserId': (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    'addLike': '/data/likes',
    'bookLikesByBookId': (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    'likesByUserId': (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
    
}

export async function getAllBooks() {
    return await get(endpoints.allBooks);
}

export async function getBookById(id) {
    return await get(endpoints.getBook + id);
}

export async function getBookByUserId(userId) {
    return await get(endpoints.booksByUserId(userId));
}

export async function createBook(title, description, imageUrl, type) {
    return await post(endpoints.addBook, { title, description, imageUrl, type });
}

export async function editBook(id, title, description, imageUrl, type) {
    return await put(endpoints.getBook + id, { title, description, imageUrl, type });
}

export async function deleteBookById(id) {
    return await del(endpoints.getBook + id)
}

export async function addLike(bookId) {
    return await post(endpoints.addLike, { bookId })
}

export async function getBookLikesById(bookId){
    return await get(endpoints.bookLikesByBookId(bookId));
}

export async function getUserBookLikesById(bookId, userId){
    return await get(endpoints.likesByUserId(bookId, userId));
}