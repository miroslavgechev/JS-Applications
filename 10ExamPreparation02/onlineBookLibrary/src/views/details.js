import { html } from '../../node_modules/lit-html/lit-html.js'
import { addLike, deleteBookById, getBookById, getBookLikesById, getUserBookLikesById } from '../api/data.js';
import { getUserId } from '../util/util.js';

const detailsTemplate = (book, isOwner, onDelete, canLike, bookLikes, onLike) => html`
        <section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src=${book.imageUrl}></p>
                <div class="actions">
                    ${isOwner ?
        html`
                        <a class="button" href="/catalog/${book._id}/edit">Edit</a>
                        <a class="button" @click=${onDelete} href="javascript:void(0)">Delete</a>
                    `
        :
        null
    }
                ${canLike ? html`
                <a class="button" @click=${onLike} href="javascript:void(0)">Like</a>
                `
        :
        null}
                    
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${bookLikes}</span>
                    </div>
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>
`

export async function detailsView(ctx) {

    const userId = getUserId();
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);

    let userLikes = 1;
    const bookLikes = await getBookLikesById(bookId);

    if (userId) {
        userLikes = await getUserBookLikesById(bookId, userId);
    }

    const isOwner = userId === book._ownerId;
    const canLike = userId && (Number(userLikes) === 0) && !isOwner


    ctx.render(detailsTemplate(book, isOwner, onDelete, canLike, bookLikes, onLike));

    async function onDelete(e) {

        const confirmDeletion = confirm('Are you sure?');

        if (confirmDeletion) {
            await deleteBookById(bookId);
            ctx.page.redirect('/catalog');
        }
    }

    async function onLike(e) {
        await addLike(bookId);
        ctx.page.redirect('/catalog/' + bookId);
    }
}