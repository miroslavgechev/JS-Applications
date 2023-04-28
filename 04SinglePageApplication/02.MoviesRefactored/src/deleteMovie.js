import { del } from "./api.js";

export async function deleteMovie(e, movieId) {

    const movieDeleteLikeLink = `http://localhost:3030/data/movies/${movieId}`

    try {
        await del(movieDeleteLikeLink);
        location.reload()
    } catch (err) {
        alert(err)
    }
}
