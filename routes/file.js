const express = require('express')
const fileController = require('../controllers/file')
const media_handler = require('../lib/media_handler')
const authorize = require('../middlewares/jwt')

const router = express.Router()

router.post('/upload', authorize ,media_handler.upload.single('image'), fileController.upload)

module.exports = router