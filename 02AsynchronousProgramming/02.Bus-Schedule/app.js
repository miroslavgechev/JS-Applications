function solve() {

    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const infoBoard = document.getElementsByClassName('info')[0];

    let nextId = 'depot';
    let stopName = ''

    async function depart() {

        try {
            const url = `http://localhost:3030/jsonstore/bus/schedule/${nextId}`;

            const response = await fetch(url);
            const data = await response.json();

            stopName = data.name;
            nextId = data.next;

            infoBoard.textContent = `Next stop ${stopName}`

            departBtn.disabled = true;
            arriveBtn.disabled = false;
        }
        catch {
            infoBoard.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        infoBoard.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();