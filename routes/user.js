const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, user :D');
});

module.exports = router;