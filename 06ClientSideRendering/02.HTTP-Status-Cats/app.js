import { cats } from "./catSeeder.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.querySelector('#allCats');

const catCardTemplate = (cats) => html`
<ul>
    ${cats.map((cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${toggle.bind(cat)}>
                ${cat.showDetails ? 'Hide status code' : 'Show status code'}
            </button>
            ${cat.showDetails ? 
                html` 
                <div class="status" style="display: block" id=${cat.id}>
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>` 
                : 
                html` 
                <div class="status" style="display: none" id=${cat.id}>
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>`}
        </div>
    </li>`)}
</ul>
    `;

function updateView() {
    render(catCardTemplate(cats), root);
}

function toggle(){
    this.showDetails = !this.showDetails; 
    updateView();
}

updateView();