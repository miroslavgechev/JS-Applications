export function updateNav(){

    const userNav = document.querySelector('nav div#user');
    const guestNav = document.querySelector('nav div#guest');

    const user = sessionStorage.getItem('user');

    if (user){
        userNav.style.display = 'inline-block';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline-block';
    }
}