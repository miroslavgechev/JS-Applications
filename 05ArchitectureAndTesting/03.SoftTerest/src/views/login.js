import { login } from "../api/users.js";
import { createSubmitHandler } from "../util/util.js";

const section = document.getElementById('loginView');
createSubmitHandler(section, onLogin);

let ctx = null;

export function showLogin(context){
    ctx = context;
    context.showSection(section);
}

async function onLogin({email, password}){
    await login(email, password);
    section.querySelector('form').reset();
    ctx.updateNav();
    ctx.goToView('/');
}
