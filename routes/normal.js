const express = require('express')
const router = express.Router();
const requiresAuth = require('../middleware/requiresAuth')
// const validator = require('../validators/normal');
const controller = require('../controllers/normal');

router.get('/me', requiresAuth, controller.me)
router.get('/homeSetting', controller.homeSetting)
router.get('/find-out-more', controller.findOutMore)

module.exports = router;