const express = require('express')
const router = express.Router();
const validator = require('../validators/normal')
const requiresAuth = require('../middleware/requiresAuth')
const controller = require('../controllers/normal');

router.get('/me', requiresAuth, controller.me)
router.get('/homeSetting', controller.homeSetting)
router.get('/find-out-more', controller.findOutMore)
router.post('/sendMessage', controller.sendMessage)
router.get('/brochure', validator.brochure, controller.brochure)

module.exports = router;