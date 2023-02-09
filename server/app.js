const express = require('express');
const morgan = require('morgan')

const app = express();

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.use('/api/v1', require('./api'))


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`App listing on port ${PORT}`)
})