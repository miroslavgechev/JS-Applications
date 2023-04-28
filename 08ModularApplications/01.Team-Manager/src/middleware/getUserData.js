export function getUser(){
    if(sessionStorage.getItem('user')){
        return JSON.parse(sessionStorage.getItem('user'));
    } else {
        return null
    }
}

export function getUserId(){
    if(sessionStorage.getItem('user')){
        return JSON.parse(sessionStorage.getItem('user'))._id;
    } else {
        return null
    }
}