const noteModel = require('../Models/Note')

const getNotes = (req, res) => {
    const userID = req.user.id
    noteModel.find({ user : userID }).then(async (matchedUserNotes) => {
        return res.json(matchedUserNotes)
    })
}

module.exports = getNotes