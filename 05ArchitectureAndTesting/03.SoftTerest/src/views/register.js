import { register } from "../api/users.js";
import { createSubmitHandler } from "../util/util.js";

const section = document.getElementById('registerView');
createSubmitHandler(section, onRegister);

let ctx = null;

export function showRegister(context){
    ctx = context;
    context.showSection(section);
}


async function onRegister({email, password, repeatPassword}){

    if (!email || !password || !repeatPassword) {
        alert('All fields are required!');
        return;
    }
    
    if (password.length < 3) {
        alert('The password should be at least 3 characters long!');
        return;
    }
    
    if (password !== repeatPassword) {
        alert('The repeat password should be equal to the password!');
        return;
    }

    await register(email, password);
    section.querySelector('form').reset();
    ctx.updateNav();
    ctx.goToView('/');
}

