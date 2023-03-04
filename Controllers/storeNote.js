const noteModel = require('../Models/Note')
const { validationResult } = require('express-validator');

const storeNote = (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json({error : error.array()})
    }
    const {title, description, tag} = req.body
    noteModel.create({
        user: req.user.id,
        title,
        description,
        tag
    }).then(note => { res.json(note); });
}

module.exports = storeNote