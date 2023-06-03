const express = require('express')
const userController = require('../controllers/user')
const authorize = require('../middlewares/jwt')

const router = express.Router()

router.get('/profile', authorize ,userController.get_profile)

module.exports = router