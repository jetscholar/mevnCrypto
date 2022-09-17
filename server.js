// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// } else {
//     app.use(express.static('client/dist'))
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
//     })
// }

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bucketListItemRoutes = require('./routes/api/bucketListItems')
const path = require('path')

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

// Connect to Mongo
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to the mevn DB on Atlas'))

// Routes
app.use('/api/bucketListItems', bucketListItemRoutes)

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
} else {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

// Call the Server
app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`))