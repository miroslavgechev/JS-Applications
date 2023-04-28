const itemName = 'user';

export function getUserData() {
    if (sessionStorage.getItem(itemName)) {
        return JSON.parse(sessionStorage.getItem(itemName));
    } else {
        return null
    }
}

export function setUserData(data) {
    return sessionStorage.setItem(itemName, JSON.stringify(data))
}

export function clearUserData() {
    sessionStorage.removeItem(itemName)
}

export function getUserId() {
    if (sessionStorage.getItem(itemName)) {
        return JSON.parse(sessionStorage.getItem(itemName))._id;
    } else {
        return null
    }
}

export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault()
        const form = event.currentTarget;
        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries());

        callback(data);
    }
}