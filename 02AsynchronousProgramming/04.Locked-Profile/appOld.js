async function lockedProfile() {

    let main = document.getElementById('main')
    main.innerHTML = '';

    try {
        const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
        if (!response.ok) {
            throw new Error('Error');
        }
        const data = await response.json();
        let id = 1;

        Object.values(data).forEach(user => {

            let code = `
            <div class="profile">
                <img src="./iconProfile2.png" class="userIcon" />
                <label>Lock</label>
                <input type="radio" name="user${id}Locked" value="lock" checked>
                <label>Unlock</label>
                <input type="radio" name="user${id}Locked" value="unlock"><br>
                <hr>
                <label>Username</label>
                <input type="text" name="user${id}Username" value="${user.username}" disabled readonly />
                <div class="user${id}Username">
                    <hr>
                    <label>Email:</label>
                    <input type="email" name="user${id}Email" value="${user.email}" disabled readonly />
                    <label>Age:</label>
                    <input type="text" name="user${id}Age" value="${user.age}" disabled readonly />
                </div>
                
                <button class="user${id}Button">Show more</button>
            </div>`;

            main.innerHTML += code;
            id++;

        })

        for(let i = 1; i < id; i++){
        let div = document.querySelector(`div.user${i}Username`);
        div.style.display = 'none';

        let unlockedRadioButton = document.querySelector(`input[name=user${i}Locked][value=unlock]`);

        let currentButton = document.querySelector(`button.user${i}Button`);
        currentButton.addEventListener('click', (e) => {
            if (unlockedRadioButton.checked && e.target.textContent === 'Show more') {
                div.style.display = 'block';
                currentButton.textContent = 'Hide it';
            } else if (unlockedRadioButton.checked && e.target.textContent === 'Hide it') {
                div.style.display = 'none';
                currentButton.textContent = 'Show more';
            }
        });
    }       

    } catch (err) {
        console.error(err.message)
    }
}