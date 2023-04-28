function attachEvents() {

    document.getElementById('submit').addEventListener('click', collectInput);
    document.getElementById('refresh').addEventListener('click', getMessages);

}

function collectInput() {

    let authorField = document.querySelector('input[name=author]');
    let contentField = document.querySelector('input[name=content]');

    let name = authorField.value;
    let message = contentField.value;

    let body = { author: name, content: message };

    sendMessage(body);

    authorField.value = '';
    contentField.value = '';
}

async function sendMessage(body) {

    try {

        const response = await fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.error(error.message);
    }
}

async function getMessages() {

    const textArea = document.getElementById('messages');
    textArea.value = '';

    try {

        const response = await fetch('http://localhost:3030/jsonstore/messenger');
        const data = await response.json();

        textArea.value = Object.values(data)
            .map(message => `${message.author}: ${message.content}`)
            .join('\n');

    } catch (error) {
        console.error(error.message);
    }
}

attachEvents();