const express = require('express')
const router = express.Router();
const validator = require('../validators/auth')
const controller = require('../controllers/auth')

router.post('/login', validator.login, controller.login)

module.exports = router;