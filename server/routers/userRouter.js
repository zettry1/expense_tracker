const express = require('express');
const { login } = require('../controllers/loginController');
const router = express.Router();
// /users
router.post('/login', login);

module.exports = router;