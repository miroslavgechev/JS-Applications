import { html } from '../../node_modules/lit-html/lit-html.js'
import { addPersonToEvent, deleteEventById, getEventById, getEventCountById, getEventGoingsByUserId } from '../api/data.js';
import { getUserId } from '../util/util.js';


const detailsTemplate = (event, isOwner, onDelete, canGo, goCount, onGoing) =>
  html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${event.imageUrl} alt="example1" />
            <p id="details-title">${event.name}</p>
            <p id="details-category">
              Category: <span id="categories">${event.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${event.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${event.description}</span>
              </div>
            </div>

            <h3>Going: <span id="go">${goCount}</span> times.</h3>

          ${manageEditTemplate(event, isOwner, onDelete)}
          ${manageGoingTemplate(canGo, onGoing)}
          </div>
        </section>
`

const manageEditTemplate = (event, isOwner, onDelete) => html`
            ${isOwner ?
    html`
            <div id="action-buttons">
              <a href="/catalog/${event._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>
            ` :
    null}
`

const manageGoingTemplate = (canGo, onGoing) => html`
          ${canGo ? html`
          <div id="action-buttons">
              <a @click=${onGoing} href="javascript:void(0)" id="go-btn">Going</a>
          </div>
          `
    :
    null}
`

export async function detailsView(ctx) {

  const eventId = ctx.params.id;
  const userId = getUserId();
  const event = await getEventById(eventId);
  const goCount = await getEventCountById(eventId);

  let userGoings = 1;
  if (userId) {
    userGoings = await getEventGoingsByUserId(eventId, userId);
  }

  const isOwner = userId === event._ownerId;
  const canGo = userId && (Number(userGoings) === 0) && !isOwner;

  ctx.render(detailsTemplate(event, isOwner, onDelete, canGo, goCount, onGoing));

  async function onDelete() {

    const confirmDeletion = confirm('Are you sure you want to delete this event?');

    if (confirmDeletion) {
      await deleteEventById(eventId);
      ctx.page.redirect('/catalog');
    }
  }

  async function onGoing() {
    await addPersonToEvent(eventId);
    ctx.page.redirect(`/catalog/${eventId}`);
  }

}