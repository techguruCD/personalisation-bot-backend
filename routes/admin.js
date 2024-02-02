const express = require('express')
const router = express.Router();
const requiresAdmin = require('../middleware/requiresAdmin')
const validator = require('../validators/admin');
const controller = require('../controllers/admin');

router.post('/find-out-more', validator.blog, requiresAdmin, controller.updateFindOutMore)
router.post('/update-homeSetting', validator.homeSetting, requiresAdmin, controller.updateHomeSetting)

module.exports = router;