const btnLogOut = document.querySelector('a#logout');
btnLogOut.classList.remove('active');

const btnLogIn = document.querySelector('a#login');
btnLogIn.classList.remove('active');

const btnRegister = document.querySelector('a#register');
btnRegister.classList.remove('active');

const btnHome = document.querySelector('a#home');
btnHome.classList.add('active');

const navigationUser = document.getElementById('user');
const navigationGuest = document.getElementById('guest');

const welcomeHeader = document.querySelector('p.email span');

const btnLoad = document.querySelector('button.load');
btnLoad.addEventListener('click', loadCatches);

const btnAdd = document.querySelector('button.add');
btnAdd.addEventListener('click', createCatch);

const form = document.querySelector('form#addForm');

const divCatches = document.getElementById('catches');

window.addEventListener('load', onLoad);

async function loadCatches() {
    divCatches.replaceChildren();

    try {
        const response = await fetch('http://localhost:3030/data/catches');

        if (response.status !== 200) {
            throw new Error('Error fetching data');
        };

        const catchesData = await response.json();
        
        Object.values(catchesData).forEach(el => {

            let divElement = document.createElement('div');
            divElement.classList.add('catch');

            htmlGenerator('label', divElement, 'Angler');
            htmlGenerator('input', divElement, '', 'text', 'angler', el.angler);

            htmlGenerator('label', divElement, 'Weight');
            htmlGenerator('input', divElement, '', 'text', 'weight', el.weight);

            htmlGenerator('label', divElement, 'Species');
            htmlGenerator('input', divElement, '', 'text', 'species', el.species);

            htmlGenerator('label', divElement, 'Location');
            htmlGenerator('input', divElement, '', 'text', 'location', el.location);

            htmlGenerator('label', divElement, 'Bait');
            htmlGenerator('input', divElement, '', 'text', 'bait', el.bait);

            htmlGenerator('label', divElement, 'Capture');
            htmlGenerator('input', divElement, '', 'text', 'captureTime', el.captureTime);

            let btnUpdate = htmlGenerator('button', divElement, 'Update', '', 'update')
            btnUpdate.setAttribute('data-id', el._id);
            btnUpdate.setAttribute('owner-id', el._ownerId);
            btnUpdate.addEventListener('click', updateCatch);

            let btnDelete = htmlGenerator('button', divElement, 'Delete', '', 'delete')
            btnDelete.setAttribute('data-id', el._id);
            btnDelete.setAttribute('owner-id', el._ownerId);
            btnDelete.addEventListener('click', deleteCatch);

            divCatches.appendChild(divElement);
        })
    } catch (err) {
        alert(err.message);
    }

    buttonAuthorizationCheck();
}

async function updateCatch(e) {

    const buttonId = e.target.getAttribute('data-id');
    const [angler, weight, species, location, bait, captureTime] = e.target.parentElement.querySelectorAll('input');

    const body = {
        angler: angler.value,
        weight: weight.value,
        species: species.value,
        location: location.value,
        bait: bait.value,
        captureTime: captureTime.value
    };

    try {

        const response = await fetch('http://localhost:3030/data/catches/' + buttonId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(body)
        });

        if (response.status !== 200) {
            throw new Error('Error fetching data');
        };

        const data = await response.json();

        loadCatches();

    } catch (err) {
        alert(err.message);
    }
}

async function createCatch(e) {
    e.preventDefault();

    const formData = new FormData(form);

    const { angler, weight, species, location, bait, captureTime } = Object.fromEntries(formData);

    if (!angler || !weight || !species || !location || !bait || !captureTime) {
        alert('All fields are required!');
        return;
    }

    const body = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
    };

    try {

        const response = await fetch('http://localhost:3030/data/catches/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(body)
        });

        if (response.status !== 200) {
            throw new Error('Error fetching data');
        };

        const data = await response.json();
    } catch (err) {
        alert(err.message)
    }

    form.reset()
    loadCatches();

}

async function deleteCatch(e) {
    const buttonId = e.target.getAttribute('data-id');

    try {

        const response = await fetch('http://localhost:3030/data/catches/' + buttonId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('accessToken')
            }
        });

        if (response.status !== 200) {
            throw new Error('Error fetching data');
        };

        const data = await response.json();

        loadCatches();

    } catch (err) {
        alert(err.message);
    }
}

function buttonAuthorizationCheck() {

    const catchButtons = divCatches.querySelectorAll('button');
    const userId = sessionStorage.getItem('id');

    catchButtons.forEach(button => {
        if (userId === button.getAttribute('owner-id')) {
            button.disabled = false
        } else {
            button.disabled = true;
        }
    })
}

async function logout() {

    try {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: { 'X-Authorization': sessionStorage.getItem('accessToken') }
        })

        if (response.status === 204) {
            sessionStorage.clear();
            window.location = './index.html';
        }
    } catch (err) {
        console.error(err.message)
    }

    buttonAuthorizationCheck();
}

function onLoad() {
    if (sessionStorage.accessToken) {
        navigationUser.style.display = 'inline-block';
        navigationGuest.style.display = 'none';
        welcomeHeader.textContent = sessionStorage.getItem('email');
        btnLogOut.addEventListener('click', logout);
        btnAdd.disabled = false;
    } else {
        navigationUser.style.display = 'none';
        navigationGuest.style.display = 'inline-block';
        welcomeHeader.textContent = 'guest';
        btnAdd.disabled = true;
    }
}

function htmlGenerator(tagName, parent, textContent, type, className, value) {

    let el = document.createElement(tagName);
    el.textContent = textContent;

    if (parent) {
        parent.appendChild(el);
    }

    if (type) {
        el.setAttribute('type', type);
    }

    if (className) {
        el.classList.add(className);
    }

    if (value) {
        el.setAttribute('value', value);
    }

    return el;
}