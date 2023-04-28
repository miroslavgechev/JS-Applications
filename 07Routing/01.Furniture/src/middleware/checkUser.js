export function getUserId(){
    if(sessionStorage.getItem('user')){
        return JSON.parse(sessionStorage.getItem('user'))._id;
    } else {
        return null
    }
}