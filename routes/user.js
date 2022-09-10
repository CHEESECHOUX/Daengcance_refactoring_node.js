const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("<h1>Hello, user :D</h1>");
});

module.exports = router;