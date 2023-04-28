import { navigateView } from "./nav.js";
import { get, put } from "./api.js";
import { showMovieDetails } from "./viewMovieDetails.js";
import { createSubmitHandler } from "./util.js";

let movieId = null;
const movieListLink = 'http://localhost:3030/data/movies';
let movieUpdateLink = `http://localhost:3030/data/movies/${movieId}`;

export async function editMovie(e) {

    movieId = e.target.getAttribute('movie-id');
    const movieList = await get(movieListLink);
    const movie = movieList.find(movie => movie._id === movieId);
    await changeView(movie);
}

async function changeView(movie) {

    await navigateView('edit-movie');

    document.getElementById('title').value = movie.title;
    document.getElementsByTagName('textarea')[0].value = movie.description;
    document.getElementById('imageUrl').value = movie.img;

    createSubmitHandler('section#edit-movie form', submitEditedData);
}

async function submitEditedData({ title, description, img }) {
    
    if (!title || !description || !img) {
        alert('All fields are required!');
        return;
    }

    try {
        movieUpdateLink = `http://localhost:3030/data/movies/${movieId}`;
        await put(movieUpdateLink, { title, description, img });
        await showMovieDetails('', movieId);
    } catch (err) {
        alert(err);
        return;
    }
}