import { showMovieDetails } from "./viewMovieDetails.js";

const movieAddLikeLink = 'http://localhost:3030/data/likes';

export async function likeMovie(e, movieId) {

    let fetchedData;
    try {
        fetchedData = await fetchData(movieAddLikeLink, movieId);
    } catch (err) {
        alert(err)
    }

    showMovieDetails('', movieId);
}

async function fetchData(link, movieId) {
    const response = await fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({ movieId })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}