function attachEvents() {

    document.getElementById('btnLoad').addEventListener('click', loadPhonebook);
    document.getElementById('btnCreate').addEventListener('click', addEntry)

}

async function loadPhonebook() {

    try {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook');
        const data = await response.json();

        printPhonebook(Object.values(data))

    } catch (error) {
        console.error(error.message);
    }
}

function printPhonebook(data) {

    const ulElement = document.getElementById('phonebook');
    ulElement.replaceChildren();

    data.forEach(entry => {
        let li = document.createElement('li');
        li.textContent = `${entry.person}: ${entry.phone}`;

        let btnDelete = document.createElement('button');
        btnDelete.textContent = 'Delete';
        btnDelete.setAttribute('data-id', entry._id)
        btnDelete.addEventListener('click', deleteEntry);

        li.appendChild(btnDelete);
        ulElement.appendChild(li);
    });
}

async function addEntry() {

    const personField = document.getElementById('person');
    const phoneField = document.getElementById('phone');

    const body = { person: personField.value, phone: phoneField.value };

    try {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

    } catch (error) {
        console.error(error.message)
    }

    loadPhonebook();
}

async function deleteEntry(e) {

    const id = e.target.getAttribute('data-id');

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

    } catch (error) {
        console.error(error.message);
    }
    loadPhonebook();
}

attachEvents();