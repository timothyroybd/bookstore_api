const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth')

//Register
router.post(
  '/register',
  [
    check('username').not().isEmpty(),
    check('email', 'please enter a valid email address').isEmail(),
    check('password', 'at least 6 chars or more').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        username,
        email,
        password,
      });

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send('server error');
    }
  }
);
//Login
router.post(
  '/login',
  [
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'password required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);

//user profile get
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//update user profile
router.put(
  '/profile',
  [
    auth,
    check('username', 'username is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { username, email, password } = req.body;
    const userFields = {};
    if (username) userFields.username = username;
    if (email) userFields.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      userFields.password = await bcrypt.hash(password, salt);
    }
    try {
      let user = await User.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: 'User not found' });
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: userFields },
        { new: true }
      ).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
