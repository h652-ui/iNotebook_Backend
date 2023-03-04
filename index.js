const makeConnection = require('./dbConnection/dbConnection')
const express = require('express')
const userRouter = require('./Routes/auth')
const notesRouter = require('./Routes/notes')
var cors = require('cors')
makeConnection();
const app = express()
app.use(cors())

app.use(express.json())
app.use('/api/auth', userRouter)
app.use('/api/notes', notesRouter)

app.listen(5000, ()=>{
    console.log("Listening")
})