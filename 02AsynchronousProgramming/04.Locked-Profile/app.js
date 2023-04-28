async function lockedProfile() {

    let main = document.getElementById('main')
    main.replaceChildren();

    try {
        const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
        if (!response.ok) {
            throw new Error('Error');
        }
        const data = await response.json();
        let id = 1;

        Object.values(data).forEach(user =>{
            const divProfile = htmlGenerator('div', '', main, 'profile');
            const imgUserIcon = htmlGenerator('img', '', divProfile, 'userIcon');
            imgUserIcon.setAttribute('src', './iconProfile2.png');

            htmlGenerator('label', 'Lock', divProfile);
            const inputLock = htmlGenerator('input', '', divProfile, '', 'radio', `user${id}Locked`, 'lock');
            inputLock.setAttribute('checked', 'checked');

            htmlGenerator('label', 'Unlock', divProfile);
            const inputUnlock = htmlGenerator('input', '', divProfile, '', 'radio', `user${id}Locked`, 'unlock');

            htmlGenerator('br', '', divProfile);
            htmlGenerator('hr', '', divProfile);

            htmlGenerator('label', 'Username', divProfile);
            const inputUsername = htmlGenerator('input', '', divProfile, '', 'text', `user${id}Username`, user.username);
            inputUsername.disabled = true;
            inputUsername.readonly = true;

            const divUsername = htmlGenerator('div', '', divProfile);
            divUsername.id = 'userHiddenFields';
            divUsername.style.display = 'none';

            htmlGenerator('hr', '', divUsername);

            htmlGenerator('label', 'Email:', divUsername);
            const inputEmail = htmlGenerator('input', '', divUsername, '', 'email', `user${id}Email`, user.email);
            inputEmail.disabled = true;
            inputEmail.readonly = true;

            htmlGenerator('label', 'Age:', divUsername);
            const inputAge = htmlGenerator('input', '', divUsername, '', 'email', `user${id}Age`, user.age);
            inputAge.disabled = true;
            inputAge.readonly = true;

            id++;

            const currentButton = htmlGenerator('button', 'Show more', divProfile);
            currentButton.addEventListener('click', (e) => {
                if (inputUnlock.checked && e.target.textContent === 'Show more') {
                    divUsername.style.display = 'block';
                    currentButton.textContent = 'Hide it';
                } else if (inputUnlock.checked && e.target.textContent === 'Hide it') {
                    divUsername.style.display = 'none';
                    currentButton.textContent = 'Show more';
                }
            })
        })
    } catch (error) {
        console.error(error.message);
    }
}

function htmlGenerator(tagName, text, parent, className, type, name, value) {
    let el = document.createElement(tagName);
    el.textContent = text;

    if (parent) {
        parent.appendChild(el);
    }

    if (className) {
        el.className = className;
    }

    if (type) {
        el.type = type;
    }

    if (name) {
        el.name = name;
    }

    if (value) {
        el.setAttribute('value', value);
    }

    return el;
}