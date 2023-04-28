import { layoutTemplate } from "./views/layout.js";
import { render} from "../node_modules/lit-html/lit-html.js"
import { getUser } from "./middleware/getUserData.js";
import page from "../node_modules/page/page.mjs"
import { homeView } from "./views/home.js";
import { registerView } from "./views/register.js";
import { loginView } from "./views/login.js";
import { logout } from "./api/users.js";
import { browseView } from "./views/browse.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { myTeamsView } from "./views/myTeams.js";

page(renderLayout);
page('/', homeView);
page('/register', registerView);
page('/login', loginView);
page('/logout', onLogout);
page('/my-teams', myTeamsView);
page('/browse', browseView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView)

page.start();

function renderLayout(ctx, next){
    const contentHolder = document.querySelector('div#content');

    ctx.render = (content) => render(layoutTemplate(getUser(), content), contentHolder);

    next();
};

function onLogout(){
    logout();
    page.redirect('/');
}
