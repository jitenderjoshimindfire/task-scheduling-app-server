const express = require('express')
const loginController = require('../controller/loginController')
const registerController = require('../controller/registerController')
const router = express.Router();

//Login
router.post('/login', loginController)
router.post('/register', registerController)

module.exports = router;