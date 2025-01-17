require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');


const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));


// Our routes go here:
app.get('/', (req, res, next) => {
    res.render('index');
});


app.get(`/artists-search`, (req, res, next)=> {
    console.log({query: req.query})

    spotifyApi
  .searchArtists(req.query.name)
  .then(data => {
    console.log('The received data from the API: ', {PHOTOTEST:data.body.artists.items});
    console.log('The received data from the API: ', {COUNTER:data.body.artists.items.length});
    res.render(`artists-search`, {artists: data.body.artists.items, photo: data.body.artists.items[0].images[1]})
    
    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));

})

// app.post(`artists-search`, (req, res, next) => {

//   spotifyApi
//   .searchArtists(req.query.name)
//   .then(data => {
//     res.render(`artists-search`, {photo: data.body.artists.items[0].images[0].url})

  


// })



app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
