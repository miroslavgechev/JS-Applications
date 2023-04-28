import { get } from "./api.js";
import { htmlGenerator } from "./dom.js";
import { showMovieDetails } from "./viewMovieDetails.js";

const movieListLink = 'http://localhost:3030/data/movies';

export async function constructHomePage(homePageSection, movieSection, addMovieButton) {
    if (sessionStorage.getItem('email')) {
        homePageSection.appendChild(addMovieButton);
    }

    let fetchedData = await get(movieListLink);

    movieSection.querySelector('div div ul').replaceChildren(constructMovieList(fetchedData))
    homePageSection.appendChild(movieSection);

    return (homePageSection);
}

function constructMovieList(movies) {

    let fragment = document.createDocumentFragment();

    movies.forEach(movie => {
        let li = htmlGenerator('li', '', 'card');
        li.classList.add('mb-4')

        let img = htmlGenerator('img', li, 'card-img-top', '', '', movie.img, 'Card image cap');
        img.setAttribute('alt', 'Card image cap');
        img.setAttribute('width', '400');

        let divCardBody = htmlGenerator('div', li, 'card-body');
        htmlGenerator('h4', divCardBody, 'card-title', movie.title);

        let divCardFooter = htmlGenerator('div', li, 'card-footer');
        let a = htmlGenerator('a', divCardFooter, '', '', 'javascript:void(0)');

        let btn = htmlGenerator('button', a, 'btn', 'Details');
        btn.classList.add('btn-info');
        btn.classList.add('user');
        btn.setAttribute('type', 'button');
        btn.setAttribute('movie-id', movie._id);
        btn.addEventListener('click', (e) => showMovieDetails(e, movie._id))

        fragment.appendChild(li);
    });

    return fragment;
};


