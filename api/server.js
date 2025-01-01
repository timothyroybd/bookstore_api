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
    origin: ['https://bookstore-api-n50c.onrender.com/', 'http://localhost:3000', 'https://bookstore-api-theta.vercel.app/:1',  'bookstore-api-theta.vercel.app', 'https://bookstore-153f74ah5-timothyroybds-projects.vercel.app', 'https://bookstore-ox571g9my-timothyroybds-projects.vercel.app/' ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))
app.options('*', cors({ origin: ['https://bookstore-api-theta.vercel.app', 'http://localhost:3000', 'https://bookstore-153f74ah5-timothyroybds-projects.vercel.app', 'https://bookstore-ox571g9my-timothyroybds-projects.vercel.app/'], methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], credentials: true, }));


app.get('/api/test', (req, res) => {
  res.send('Test endpoint is working');
});



app.use(express.json())
app.use('/', routes)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})  