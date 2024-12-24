require('dotenv').config();
const cors = require('cors')

const db = require('./config/db')
const express = require('express')
const app = express()
const PORT = 5000; 
const routes = require('./routers/index')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json())
app.use('/', routes)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})  