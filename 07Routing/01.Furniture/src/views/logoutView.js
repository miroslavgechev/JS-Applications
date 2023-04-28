import page from '../../node_modules/page/page.mjs'
import { logout } from '../api/users.js';
import { updateNav } from '../middleware/updateNav.js';

export function logoutView(){
    logout();
    updateNav();
    page.redirect('/');
}