const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const bookRouter = require('./books')


router.get('/', async(req,res)=> {
    res.send('Hello World')
})
router.use('/auth', authRouter)
router.use('/books', bookRouter)

module.exports = router;