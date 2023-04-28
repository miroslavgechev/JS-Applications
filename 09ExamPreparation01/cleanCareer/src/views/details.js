import { html } from '../../node_modules/lit-html/lit-html.js'
import { addApplication, deleteOfferById, getApplicationCount, getOfferById, getUserCountForApplication } from '../api/data.js';
import { getUserId } from '../util/util.js';

const detailsTemplate = (offer, onDelete, onApply) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
              Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
              </div>
            </div>
            <p>Applications: <strong id="applications">${offer.applicationCount}</strong></p>

            ${offer.canEdit ? html`
            <div id="action-buttons">
              <a href="/catalog/${offer._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>                            
            </div>
            `
            :
            null}


          ${offer.canApply ? html`
          <div id="action-buttons">
            <a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>`
          :
          null}
          </div>
        </section>
`

export async function detailsView(ctx) {

  const offerId = ctx.params.id;
  const userId = getUserId();

  const offer = await getOfferById(offerId)

  const userApplicationCount = await getUserCountForApplication(offerId, userId);

  offer.applicationCount = await getApplicationCount(offerId);
  offer.canEdit = userId === offer._ownerId
  offer.canApply = !offer.canEdit && userId && userApplicationCount === 0;

  ctx.render(detailsTemplate(offer, onDelete, onApply));


  async function onDelete(e) {
    const confirmDeletion = confirm('Are you sure you want to delete the offer?');

    if (confirmDeletion) {
      await deleteOfferById(offerId);
      ctx.page.redirect('/catalog')
    }
  }

  async function onApply(e) {
    await addApplication(offerId)
    ctx.page.redirect('/catalog/' + offerId)
  }

}