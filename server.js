const express = require('express')
const movies = require('./movies-data-small.json')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()


const app = express();

app.use(helmet())
app.use(cors())
console.log(process.env.API_TOKEN)



app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization')
    console.log(authToken)
  
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
      return res.status(401).json({ error: 'Unauthorized request' })
    }

    next()
  })

app.get('/movie', (req, res)=> {
    const {genre, country, avg_vote} = req.query;
    let data = movies;

    if(genre){
        data = data.filter(movie => {
            return movie.genre.toLowerCase().includes(genre.toLowerCase())
        })
    }

    if(country){
        data = data.filter(movie => {
            return movie.country.toLowerCase().includes(country.toLowerCase())
        })
    }

    if(avg_vote){
        data = data.filter(movie => {
            if(Number(movie.avg_vote) >= Number(avg_vote)){
                return movie;
            }
        })
    }


    res.json(data)
})

app.listen(8000, ()=> {
    console.log('listening to localhost:8000')
})