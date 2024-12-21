require('dotenv').config();

const db = require('./config/db')
const express = require('express')
const app = express()
const PORT = 5000; 
const routes = require('./routers/index')

app.use(express.json())
app.use('/', routes)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})