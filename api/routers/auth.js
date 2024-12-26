const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

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
      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };
      // jwt.sign(
      //   payload,
      //   process.env.jwtSecret,
      //   { expiresIn: 3600 },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      await User.findByIdAndUpdate(user.id, { refreshToken });
      res.cookie('refreshToken', refreshToken, { httpOnly:true });
      res.json({ accessToken });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);

//user profile get
router.get('/profile', auth, async (req, res) => {
  try {
    console.log('User ID from token:', req.user);
    const user = await User.findById(new ObjectId(req.user)).select('-password');
    console.log('User fetched from DB:', user)
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

router.post('/token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({id: decoded.id});
    res.json({ accessToken });
  });
});
module.exports = router;
