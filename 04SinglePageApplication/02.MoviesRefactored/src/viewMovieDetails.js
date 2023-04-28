import { deleteMovie } from "./deleteMovie.js";
import { checkMovieLike, submitMovieLike } from "./manageMovieLikes.js";
import { get } from "./api.js";
import { htmlGenerator } from "./dom.js";
import { editMovie } from "./viewMovieEdit.js";

const footer = document.getElementsByTagName('footer')[0];
const container = document.getElementById('container');
const movieListLink = 'http://localhost:3030/data/movies';
let ownerId;
let userId = sessionStorage.getItem('_id');
let movieId;

export async function showMovieDetails(e, movieIdent) {
    const movieList = await get(movieListLink);
    const movie = movieList.find(movie => movie._id === movieIdent);

    ownerId = movie._ownerId;
    movieId = movieIdent;

    const movieLikesLink = `http://localhost:3030/data/likes?where=movieId%3D%22${movie._id}%22&distinct=_ownerId&count`;
    const movieLikes = await get(movieLikesLink);

    [...document.getElementsByTagName('section')].forEach(section => section.remove());
    container.insertBefore(await constructMovieDetailsPage(movie, movieLikes), footer);
}

async function constructMovieDetailsPage(movie, numberOfLikes) {

    let section = htmlGenerator('section', '', 'view-section');
    section.id = 'movie-example';

    let divContainer = htmlGenerator('div', section, 'container');

    let divMovie = htmlGenerator('div', divContainer, 'row');
    divMovie.classList.add('bg-light');
    divMovie.classList.add('text-dark');

    htmlGenerator('h1', divMovie, '', `Movie title: ${movie.title}`);

    let divImage = htmlGenerator('div', divMovie, 'col-md-8');
    let img = htmlGenerator('img', divImage, 'img-thumbnail', '', '', movie.img);
    img.setAttribute('alt', 'Movie');

    let divDescription = htmlGenerator('div', divMovie, 'col-md-4');
    divDescription.classList.add('text-center');
    htmlGenerator('h3', divDescription, 'my-3', 'Movie Description');
    htmlGenerator('p', divDescription, '', movie.description);
    
    if (userId === ownerId) {
        let deleteBtn = htmlGenerator('a', divDescription, 'btn', 'Delete', '#');
        deleteBtn.classList.add('btn-danger');
        deleteBtn.addEventListener('click', (e) => deleteMovie(e, movieId));

        let editBtn = htmlGenerator('a', divDescription, 'btn', 'Edit', '#');
        editBtn.classList.add('btn-warning');
        editBtn.setAttribute('movie-id', movie._id);
        editBtn.addEventListener('click', (e) => editMovie(e, movieId));

    } else if (await checkMovieLike(movieId, userId)) {
        htmlGenerator('span', divDescription, 'enrolled-span', `Liked ${numberOfLikes}`)
        
    } else {
        let likeBtn = htmlGenerator('a', divDescription, 'btn', 'Like', '#');
        likeBtn.classList.add('btn-primary');
        likeBtn.addEventListener('click', (e) => submitMovieLike(e, movieId));
    }

    return section;
}



