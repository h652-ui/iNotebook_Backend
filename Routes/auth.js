const express = require('express')
const { body } = require('express-validator');
const router = express.Router()

router.post('/create', [body('email', "Enter Correct Email Address").isEmail(), body('password', "Lenght must be at least 5").isLength({ min: 5 }), body('password', "must contain a number").matches(/\d/)], require('../Controllers/storeUser'))
router.post('/', [body('email', "Enter Correct Email Address").isEmail(), body('password', "Password cannot be empty").exists()], require('../Controllers/authUser'))
router.post('/getuser', require('../Middleware/authToken'), require('../Controllers/getUser'))
module.exports = router