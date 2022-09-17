if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bucketListItemRoutes = require('./routes/api/bucketListItems')

app.use(cors())
app.use(morgan('tiny'))

// Connect to Mongo
//mongoose.set('useCreateIndex', true); // to allow for creation of unique users ** deprecated in version 6
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to the mevn DB on Atlas'))

app.use('/api/bucketListItems', bucketListItemRoutes)
app.get('/', (req, res) => res.send('Hello World'))

app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`))