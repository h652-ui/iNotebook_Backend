const userModel = require('../Models/User')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWTKEY = "MynameisHamid"

const authUser = (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const {email, password} = req.body
    userModel.findOne({ email }).then(async (matchedUser) => {
        if (matchedUser) {
            if(bcrypt.compareSync(password, matchedUser.password)){
                const authToken = jwt.sign({user:{id:matchedUser._id}}, JWTKEY)
                return res.json({authToken})   
            }else{
                return res.status(400).json({ error: "Invalid Credentials : Password mismatch" });    
            }
        }
        else {
            return res.status(400).json({ error: "Invalid Credentials : Email not Exist" });
        }
    })
}

module.exports = authUser