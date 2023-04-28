export function setUserData(data) {
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('password', data.password);
    sessionStorage.setItem('_id', data._id);
    sessionStorage.setItem('accessToken', data.accessToken);
}

export function clearUserData() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('_id');
    sessionStorage.removeItem('accessToken');
}

export function createSubmitHandler(selector, callback){
    
    document.querySelector(selector).addEventListener('submit', onSubmit);

    function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        callback(data, event);
    }

}