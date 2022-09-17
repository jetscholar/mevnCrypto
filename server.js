if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')

app.get('/', (req, res) => res.send('Hello World'))

app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`))