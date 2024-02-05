const express = require('express')
const router = express.Router();
const requiresAdmin = require('../middleware/requiresAdmin')
const validator = require('../validators/admin');
const controller = require('../controllers/admin');

router.post('/find-out-more', validator.blog, requiresAdmin, controller.updateFindOutMore)
router.post('/update-homeSetting', validator.homeSetting, requiresAdmin, controller.updateHomeSetting)
router.get('/brochures', requiresAdmin, controller.brochures)
router.post('/brochure-upload', requiresAdmin, controller.brochureUpload)
router.post('/brochure-delete', requiresAdmin, controller.brochureDelete)

router.get('/bot-files', validator.botFiles, requiresAdmin, controller.botFiles)
router.post('/bot-file-upload', requiresAdmin, controller.botFileUpload)
router.post('/bot-file-delete', requiresAdmin, controller.botFileDelete)

module.exports = router;