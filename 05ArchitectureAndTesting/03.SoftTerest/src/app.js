import { logout } from "./api/users.js";
import { initialize } from "./router.js";
import { showCatalogue } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

const views = document.getElementById('views');
views.remove();

const links = {
    '/': showHome,
    '/register': showRegister,
    '/login': showLogin,
    '/logout': onLogout,
    '/catalog': showCatalogue,
    '/details': showDetails,
    '/create': showCreate
};

const router = initialize(links);
router.updateNav();
router.goToView('/');

function onLogout(){
    logout();
    router.updateNav()
    router.goToView('/')
}
