const weatherForm = document.querySelector('form');
const search = document.querySelector('form input');
const errorMessage = document.querySelector('p#error');
const outputForecast = document.querySelector('p#output');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    outputForecast.innerHTML = 'Searching...';
    errorMessage.innerHTML = '';
    fetch('/weather?address=' + location)
    .then((response) => {
        return response.json();
    }).then(data => {
        if(data.error){
            errorMessage.textContent = data.error;
            outputForecast.textContent = '';
        } else {
            errorMessage.textContent = '';
            const location = data.location;
            outputForecast.innerHTML = `Showing forecast for: <b>${data.address}</b> <small>[${location.name}, ${location.region}, ${location.country}]</small><br />` +
                                        `${data.weather}<br />` +
                                        `Temperature ${data.forecast} <sup>o</sup>C<br />` +
                                        `Feels like ${data.feelslike} <sup>o</sup>C<br />` +
                                        `Chances of rain ${data.precip}<br />` +
                                        `Local time ${location.localtime}<br />` +
                                        `Geolocation lat: ${location.lat}, lon: ${location.lon}`
            console.log(data);
        }
    })
    .catch((err) => {
        console.log(err);
    });
})