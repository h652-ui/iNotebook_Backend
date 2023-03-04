const userModel = require('../Models/User')

const getUser = (req, res) => {
    const userID = req.user.id
    userModel.findOne({ id : userID }).then(async (matchedUser) => {
        return res.json(matchedUser)
    })
}

module.exports = getUser