const jwt = require('jsonwebtoken')
const JWTKEY = "MynameisHamid"

const authToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (token) {
        try {
            const data = jwt.verify(token, JWTKEY)
            req.user = data.user
            next()
        } catch (error) {
            res.json({ error: "Please Provide Valid Token." })
        }
    } else {
        res.json({ error: "Please Provide Valid Token." })
    }
}

module.exports = authToken