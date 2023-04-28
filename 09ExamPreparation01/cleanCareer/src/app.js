import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js'
import { getUserData } from './util/util.js';
import { layoutTemplate } from './views/layout.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { logout } from './api/auth.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';


const root = document.querySelector('div#wrapper');

page(decorateContext)
page('index.html', '/');
page('/', homeView);
page('/catalog', catalogView);
page('/catalog/:id', detailsView);
page('/create', createView);
page('/catalog/:id/edit', editView)
page('/login', loginView);
page('/register', registerView);
page('/logout', onLogout);

page.start()


function decorateContext(ctx, next) {
    ctx.render = renderView;

    next();
}

function renderView(content) {
    const userData = getUserData()
    render(layoutTemplate(userData, content), root);
};

function onLogout(ctx){
    logout();
    ctx.page.redirect('/catalog')
}