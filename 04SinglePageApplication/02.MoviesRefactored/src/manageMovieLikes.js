import { get, post } from "./api.js";
import { showMovieDetails } from "./viewMovieDetails.js";

const movieAddLikeLink = 'http://localhost:3030/data/likes';

export async function submitMovieLike(e, movieId) {
    try {
        await post(movieAddLikeLink, {movieId})
    } catch (err) {
        alert(err)
    }

    showMovieDetails('', movieId);
}

export async function checkMovieLike(movieId, userId) {

    let fetchedData;
    const link = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`
    try {
        fetchedData = await get(link);
    } catch (err) {
        alert(err)
    }
    return fetchedData.length;
}