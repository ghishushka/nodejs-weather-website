const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));

const viewsPath = path.join(__dirname, '../tpl/views');
const partialsPath = path.join(__dirname, '../tpl/partials');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: 'Denis Slonovschi'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: 'Denis Slonovschi'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        name: 'Denis Slonovschi',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    });
});

app.get('/weather', (req, res) => {

    const searchAdress = req.query.address;
    if (!searchAdress) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    geocode(searchAdress, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(searchAdress, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                });
            }
            const location = forecastData.location;
            const current = forecastData.current;
            res.send({
                weather: current.weather_descriptions[0],
                forecast: current.temperature,
                feelslike: current.feelslike,
                precip: current.precip * 10 + '%',
                location,
                address: searchAdress
            });
        })
    });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Oops...',
        content: "Help article not found",
        name: "Denis Slonovschi"
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Oops...',
        content: "Page not found",
        name: "Denis Slonovschi"
    });
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});