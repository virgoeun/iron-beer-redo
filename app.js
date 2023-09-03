const express = require('express');

const hbs = require('hbs'); //only when partial is required
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
 // only when you need partials (define)
hbs.registerPartials(path.join(__dirname, 'views/partials'));

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    }) 
    // you need {beers: beersFromApi} curly as it's object (if just beers, doesn't work!)
    .catch(error => console.log(error));
});


app.get("/random-beer", (req, res) => {

    punkAPI
    .getRandom() 
    .then (randomFromApi => {
        console.log(randomFromApi);
        res.render('randombeer', {randombeers: randomFromApi})
    })
    .catch ((err) => console.error(err));
})

app.get("/beers/:beerId", (req, res)=> {
    console.log('params', req.params);  // params { beerId: '211' }
    const id = req.params.beerId // obejct -> beerId value stored
    punkAPI
    .getBeer(id)
    .then (idBeerFromApi => {
        console.log(idBeerFromApi);
        res.render("beerdetails", {beer: idBeerFromApi})
    })


})

app.listen(3000, () => console.log('🏃‍ on port 3000'))