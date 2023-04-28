function attachEvents() {

    const enumeration = {
        'Sunny': '&#x2600', // ☀
        'Partly sunny': '&#x26C5', // ⛅
        'Overcast': '&#x2601', // ☁
        'Rain': '&#x2614', // ☂
        'Degrees': '&#176'   // °
    }

    const forecastElement = document.getElementById('forecast');
    const currentConditionsElement = document.getElementById('current');
    const upcomingConditionsElement = document.getElementById('upcoming');

    const inputElement = document.getElementById('location');

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', getWeather);

    let currentName = '';
    let currentCode = '';

    async function getWeather() {

        try {
            const response = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
            const data = await response.json()

            currentName = inputElement.value;
            currentCode = data.find(el => el.name == currentName)
            currentCode = currentCode.code;

            const responseToday = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${currentCode}`);
            const dataToday = await responseToday.json();

            const responseUpcoming = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${currentCode}`);
            const dataUpcoming = await responseUpcoming.json();

            getToday(dataToday);
            getUpcoming(dataUpcoming);

        } catch {
            document.getElementsByClassName('label')[0].textContent = 'Error';
            forecastElement.style.display = 'block';
        }

    }

    function getToday(data) {

        let div = document.createElement('div');
        div.classList.add('forecasts');

        let spanConditionSymbol = document.createElement('span');
        spanConditionSymbol.classList.add('condition', 'symbol');
        spanConditionSymbol.innerHTML = enumeration[data.forecast.condition];

        let spanForData = document.createElement('span');
        spanForData.classList.add('condition');

        let spanForecastData = document.createElement('span');
        spanForecastData.classList.add('forecast-data');
        spanForecastData.textContent = `${data.name}`;

        let spanTemperature = document.createElement('span');
        spanTemperature.classList.add('forecast-data');
        spanTemperature.innerHTML = `${data.forecast.low}${enumeration['Degrees']}/${data.forecast.high}${enumeration['Degrees']}`;

        let spanCondition = document.createElement('span');
        spanCondition.classList.add('forecast-data');
        spanCondition.textContent = `${data.forecast.condition}`;

        spanForData.appendChild(spanForecastData);
        spanForData.appendChild(spanTemperature);
        spanForData.appendChild(spanCondition);

        div.appendChild(spanConditionSymbol);
        div.appendChild(spanForData);

        currentConditionsElement.appendChild(div);

        forecastElement.style.display = 'block';

    }

    function getUpcoming(data) {

        let div = document.createElement('div');
        div.classList.add('forecast-info');

        data.forecast.forEach(day => {

            let spanForData = document.createElement('span');
            spanForData.classList.add('upcoming');

            let spanConditionSymbol = document.createElement('span');
            spanConditionSymbol.classList.add('symbol');
            spanConditionSymbol.innerHTML = enumeration[day.condition];

            let spanTemperature = document.createElement('span');
            spanTemperature.classList.add('forecast-data');
            spanTemperature.innerHTML = `${day.low}${enumeration['Degrees']}/${day.high}${enumeration['Degrees']}`;

            let spanCondition = document.createElement('span');
            spanCondition.classList.add('forecast-data');
            spanCondition.textContent = `${day.condition}`;

            spanForData.appendChild(spanConditionSymbol);
            spanForData.appendChild(spanTemperature);
            spanForData.appendChild(spanCondition);

            div.appendChild(spanForData);
        })

        upcomingConditionsElement.appendChild(div);
    }
}

attachEvents();