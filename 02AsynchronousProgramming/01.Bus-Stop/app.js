async function getInfo() {

    const stopIdElement = document.getElementById('stopId');
    const stopNameElement = document.getElementById('stopName');

    const busesElement = document.getElementById('buses');
    busesElement.innerHTML = '';

    try {
        const url = `http://localhost:3030/jsonstore/bus/businfo/${stopIdElement.value}`;

        const response = await fetch(url);
        const data = await response.json()

        stopNameElement.textContent = data.name;

        Object.entries(data.buses).forEach(([busId, time]) => {
            let li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${time} minutes`;

            busesElement.appendChild(li);
        })
    } catch {
        stopNameElement.textContent = 'Error'
    }

}