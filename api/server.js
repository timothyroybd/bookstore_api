require('dotenv').config();
const cors = require('cors')

const db = require('./config/db')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000; 
const routes = require('./routers/index')

app.use((req,res, next) => {
    res.setHeader('Cache-control', 'no-store')
    next()
})

app.use(cors({
    origin: ['https://bookstore-api-n50c.onrender.com/', 'http://localhost:3000', 'https://bookstore-api-theta.vercel.app/' ],
    credentials: true
}))
app.get('/api/test', (req, res) => {
  res.send('Test endpoint is working');
});



app.use(express.json())
app.use('/', routes)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})  