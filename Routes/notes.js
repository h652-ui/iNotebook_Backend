const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const authToken = require('../Middleware/authToken')
const storeNote = require('../Controllers/storeNote')

router.post('/create', authToken, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })], storeNote)
router.get('/getnotes', require('../Middleware/authToken'), require('../Controllers/getNotes'))
router.put('/updatenote/:id', require('../Middleware/authToken'), require('../Controllers/updateNotes'))
router.delete('/deletenote/:id', require('../Middleware/authToken'), require('../Controllers/deleteNote'))
module.exports = router