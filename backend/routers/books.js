const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

//Get all books from DB
router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find({user:req.user.id});
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});

//Post a new book in DB
router.post(
  '/register',
  [
    auth,
    check('title').not().isEmpty().withMessage('Title is required'),
    check('author').not().isEmpty().withMessage('Author is required'),
    check('description').not().isEmpty().withMessage('Description is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { title, author, description } = req.body;

    try {
     
      const book = new Book({
        title,
        author,
        description,
        user: req.user.id,
      });

      await book.save();
      res.json(book);
    } catch (err) {
      console.error(err.message);
      console.error("detailed error", err)
      res.status(500).send(err.message);
    }
  }
);

// Update an existing book
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).send();
    }
    res.json(book);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete an existing book
router.delete('/:id', auth, async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    return res.status(404).send();
  }
  res.json({ msg: 'The books has been deleted' });
});

module.exports = router;
