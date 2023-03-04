const noteModel = require('../Models/Note')

const updateNotes = (req, res) => {
    const userID = req.user.id
    noteModel.findById(req.params.id).then(note => {
        if(note){
            if(userID !== note.user.toString()){
                return res.status(403).json({error : 'Access Denied'})
            }
            const {title, description, tag} = req.body 
            const newNote = {}
            if(title)
                newNote.title = title
            if(description)
                newNote.description = description
            if(tag)
                newNote.tag = tag
            noteModel.findByIdAndUpdate(note.id, newNote, {new:true}).then(updatedNote => {
                return res.json(updatedNote)
            })
        }else{
            return res.status(404).json({error : 'Note Found'})
        }
    })
}

module.exports = updateNotes