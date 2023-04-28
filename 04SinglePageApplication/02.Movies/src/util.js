async function fetchMovies(link) {
    const response = await fetch(link)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data;
}

export async function getMovieData(link) {

    let fetchedData;
    try {
        fetchedData = await fetchMovies(link);
    } catch (err) {
        alert(err)
    }

    return fetchedData;
}

export function htmlGenerator(tagName, parent, className, textContent, href, src) {

    let el = document.createElement(tagName);
    el.textContent = textContent;

    if (parent) {
        parent.appendChild(el);
    }

    if (className) {
        el.classList.add(className);
    }

    if (href) {
        el.setAttribute('href', href);
    }

    if (src) {
        el.setAttribute('src', src);
    }

    return el;
}
