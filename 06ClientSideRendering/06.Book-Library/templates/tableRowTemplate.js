import { html } from '../node_modules/lit-html/lit-html.js';

export const tableRowTemplate = (books, ctx) =>
    books.map(book => html`
            <tr>
                <td>${book[1].title}</td>
                <td>${book[1].author}</td>
                <td>
                    <button data-id=${book[0]} @click=${ctx.editBookFormFill}>Edit</button>
                    <button data-id=${book[0]} @click=${ctx.deleteBook}>Delete</button>
                </td>
            </tr>
            `);