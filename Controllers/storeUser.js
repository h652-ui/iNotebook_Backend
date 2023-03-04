const userModel = require('../Models/User')
const { validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');

const storeUser = (req, res) => {
    const errors = {}
    const error = validationResult(req);
    if (!error.isEmpty()) {
        errors.validationErrors = error.array()
    }
    userModel.findOne({ email: req.body.email }).then(async (matchedUser) => {
        if (!matchedUser && (Object.keys(errors).length === 0)) {
            var salt = await bcrypt.genSaltSync(10);
            var hashPassword = await bcrypt.hashSync(req.body.password, salt)
            userModel.create({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            }).then(user => { res.json(user); });
        }
        else {
            if (matchedUser)
                errors.alreadyExist = "User Already Exist"
            return res.status(400).json({ error: errors });
        }
    })
}

module.exports = storeUser