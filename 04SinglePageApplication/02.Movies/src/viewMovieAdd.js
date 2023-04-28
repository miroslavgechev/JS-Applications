import { navigateView, updateButtonsView } from "./nav.js";

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
        await submitData(title, description, img, addMovieLink);
    } catch (err) {
        alert(err);
        addMovieForm.reset();
        return;
    }

    addMovieForm.reset();
    updateButtonsView();
    navigateView('home-page');
}

async function submitData(title, description, img, link) {
    const response = await fetch(link, {
        method: 'POST',
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