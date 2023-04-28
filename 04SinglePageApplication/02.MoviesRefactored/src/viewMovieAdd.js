import { post } from "./api.js";
import { navigateView, updateButtonsVisibility } from "./nav.js";

const addMovieLink = 'http://localhost:3030/data/movies';

export async function addMovie(e) {
    e.preventDefault();

    const addMovieForm = document.getElementById('add-movie-form');

    const formData = new FormData(addMovieForm);
    const { title, description, img } = Object.fromEntries(formData);

    if (!title || !description || !img) {
        alert('All fields are required!');
        return;
    }

    try {
        post(addMovieLink, {title, description, img});
    } catch (err) {
        alert(err);
        addMovieForm.reset();
        return;
    }

    addMovieForm.reset();
    updateButtonsVisibility();
    navigateView('home-page');
}