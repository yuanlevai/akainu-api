const express = require('express')

const itemController = require('../controllers/item')
const authorize = require('../middlewares/jwt')
const admin_middleware = require('../middlewares/admin')
const router = express.Router()

router.get('/', itemController.list)
router.get('/:id', itemController.getById)
// delete item [unfinished]
router.delete('/:id',authorize, admin_middleware, itemController.delete)
router.post('/', authorize, admin_middleware ,itemController.create)

module.exports = router