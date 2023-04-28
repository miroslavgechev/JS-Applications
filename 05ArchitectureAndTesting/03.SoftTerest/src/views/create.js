import { createIdea } from "../api/data.js";
import { createSubmitHandler } from "../util/util.js";

const section = document.getElementById('createView');
createSubmitHandler(section, onCreate);

let ctx = null;

export function showCreate(context) {
    ctx = context;
    context.showSection(section);
}

async function onCreate({ title, description, imageURL }) {

    if (!imageURL || !imageURL || !imageURL) {
        alert('All fields are required!');
        return;
    }

    if (title.length < 6) {
        alert('The password should be at least 6 characters long!');
        return;
    }

    if (description.length < 10) {
        alert('The password should be at least 3 characters long!');
        return;
    }

    if (imageURL.length < 5) {
        alert('The password should be at least 3 characters long!');
        return;
    }

    await createIdea(title, description, imageURL);
    section.querySelector('form').reset();
    ctx.goToView('/catalog');
}

