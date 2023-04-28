const formElement = document.getElementById('form');
formElement.addEventListener('submit', createStudent);

const tableBody = document.querySelector('#results tbody')

loadStudents();

async function createStudent(e) {

    e.preventDefault();

    const formData = new FormData(formElement);

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    const body = { firstName, lastName, facultyNumber, grade };

    const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    formElement.reset();
    loadStudents();
}

async function loadStudents() {

    const response = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = await response.json();

    tableBody.replaceChildren();

    Object.values(data).forEach(student => {

        let tr = htmlGenerator('tr', tableBody, '');

        htmlGenerator('td', tr, student.firstName);
        htmlGenerator('td', tr, student.lastName);
        htmlGenerator('td', tr, student.facultyNumber);
        htmlGenerator('td', tr, student.grade);
    })
}

function htmlGenerator(tagName, parent, text) {
    let el = document.createElement(tagName);
    el.textContent = text;

    if (parent) {
        parent.appendChild(el);
    }

    return el;
}
