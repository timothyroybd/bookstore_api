const express = require('express')
const router = express.Router()
const Book = require('../models/Book')
const User = require('../models/User')
const {check, validationResult } = require('express-validator')

//Get all books from DB
router.get('/', async(req,res)=> {
    try{
        const books = await Book.find()
        res.json(books)
    } catch(err){
        console.error(err.message)
        res.status(500).send(err)
    }
})

//Post a new book in DB
router.post('/register', [check('title').not().isEmpty().withMessage('Title is required'), check('author').not().isEmpty().withMessage('Author is required'),check('description').not().isEmpty().withMessage('Description is required'), check('user').isMongoId().withMessage('Invalid userid')], async(req, res)=> {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    const {title, author, description, user} = req.body

    try{
        const existingUser = await User.findById(user)

    if(!existingUser){
        return res.status(400).json({msg: 'User doesn not exists'})
    }
    book = new Book({
        title, 
        author, 
        description,
        user
    })

    await book.save()
    res.json(book)

    


    }
    catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
    


})

// Update an existing book 
router.put('/:id', async(req, res)=> {

    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})

    if(!book){
        return res.status(404).send()
    }
    res.json(book)
    } catch(err){
        res.status(400).send(err)
    }
    
})

//Delete an existing book
router.delete('/:id', async(req, res)=> {
    const book = await Book.findByIdAndDelete(req.params.id,req.body, {new: true, runValidators:true})

    if(!book){
        return res.status(404).send()
    }
    res.json({msg: 'The books has been deleted'})
})

module.exports = router