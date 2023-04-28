import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs'
import { deleteFurniture, getFurnitureDetails } from '../api/data.js';
import { getUserId } from '../middleware/checkUser.js';

const container = document.querySelector('body div.container');

const detailsViewTemplate = (item) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src=${item.img} />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${item.make}</span></p>
            <p>Model: <span>${item.model}</span></p>
            <p>Year: <span>${item.year}</span></p>
            <p>Description: <span>${item.description}</span></p>
            <p>Price: <span>${item.price}</span></p>
            <p>Material: <span>${item.material}</span></p>
            <div>
                ${item.canEdit ? html` 
                <a href="/edit/${item._id}" class="btn btn-info">Edit</a>
                <a href=”javascript:void(0)” class="btn btn-red" id=${item._id} @click=${deleteItem} >Delete</a>
                ` 
                :
                null    
                }
            </div>
        </div>
    </div>
`

export async function detailsView(ctx) {
    const itemId = ctx.params.id;   
    let data = await getFurnitureDetails(itemId)

    const userId = getUserId();

    const itemOwnerId = data._ownerId;
    data.canEdit = false;

    if(userId === itemOwnerId){
        data.canEdit = true;
    }

    render(detailsViewTemplate(data), container);
}

function deleteItem(e){
    e.preventDefault();
    const itemId = e.currentTarget.id;
    let confirmDeletion = confirm('Are you sure you want to delete this item?');

    if(confirmDeletion){
        deleteFurniture(itemId);
        page.redirect('/')
    } else {
        return
    }
}