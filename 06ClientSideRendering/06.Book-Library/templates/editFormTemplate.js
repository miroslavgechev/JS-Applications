import { html } from '../node_modules/lit-html/lit-html.js';

export const editFormTemplate = (book, ctx, bookId) => html`
    <form id="edit-form" data-id=${bookId}>
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." .value=${book.title}>
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." .value=${book.author}>
        <input type="submit" value="Save" @click=${ctx.editBook}>
    </form>`