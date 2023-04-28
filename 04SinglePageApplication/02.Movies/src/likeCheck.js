export async function likeCheck(movieId, userId) {

    let fetchedData;
    const link = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`
    try {
        fetchedData = await fetchData(link);
    } catch (err) {
        alert(err)
    }
    
    return fetchedData.length;
}

async function fetchData(link) {
    const response = await fetch(link)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data;
}

