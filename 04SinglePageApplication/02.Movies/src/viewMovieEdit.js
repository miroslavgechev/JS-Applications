import { navigateView } from "./nav.js";
import { getMovieData } from "./util.js";
import { showMovieDetails } from "./viewMovieDetails.js";

const movieListLink = 'http://localhost:3030/data/movies';
const movieUpdateLink = 'http://localhost:3030/data/movies/';
let movieId;

export async function editMovie(e) {

    movieId = e.target.getAttribute('movie-id');
    const movieList = await getMovieData(movieListLink);

    const movie = movieList.find(movie => movie._id === movieId);

    await changeView(movie);
}

async function changeView(movie) {

    await navigateView('edit-movie');

    document.getElementById('title').value = movie.title;
    document.getElementsByTagName('textarea')[0].value = movie.description;
    document.getElementById('imageUrl').value = movie.img;

    document.querySelector('section#edit-movie form').addEventListener('submit', submitEditedData);
}

async function submitEditedData(e) {
    e.preventDefault();

    const editMovieForm = e.target;

    const formData = new FormData(editMovieForm);
    const { title, description, img } = Object.fromEntries(formData);

    if (!title || !description || !img) {
        alert('All fields are required!');
        return;
    }

    try {
        await submitData(title, description, img, `http://localhost:3030/data/movies/${movieId}`);
        await showMovieDetails('', movieId);
    } catch (err) {
        alert(err);
        return;
    }
}

async function submitData(title, description, img, link) {
    const response = await fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({ title, description, img })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message)
    }
}