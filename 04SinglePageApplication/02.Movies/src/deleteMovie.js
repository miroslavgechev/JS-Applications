
export async function deleteMovie(e, movieId) {

    let fetchedData;
    const movieDeleteLikeLink = `http://localhost:3030/data/movies/${movieId}`

    try {
        fetchedData = await fetchData(movieDeleteLikeLink);
        location.reload()
    } catch (err) {
        alert(err)
    }
}

async function fetchData(link) {
    const response = await fetch(link, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}