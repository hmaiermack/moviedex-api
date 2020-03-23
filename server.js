const express = require('express')
const movies = require('./movies-data-small.json')

const app = express();

app.get('/movie', (req, res)=> {
    res.json(movies)
})

app.listen(8000, ()=> {
    console.log('listening to localhost:8000')
})