import { clearUserData, getUserData } from "../util/util.js";

const host = 'http://localhost:3030';

async function request(method, url, data) {

    const options = {
        method,
        headers: {}
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getUserData();
    if (user) {
        const token = user.accessToken;
        options.headers['X-Authorization'] = token;
    };

    try {
        const response = await fetch(host + url, options);

        if (!response.ok) {

            if (response.status === 403) {
                clearUserData()
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        };

        return response.json()

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

const get = request.bind(null, 'get');
const post = request.bind(null, 'post');
const put = request.bind(null, 'put');
const del = request.bind(null, 'delete');

export {
    get,
    post,
    put,
    del
};