const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
       return next()
    }
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            res.status(401).json({ message: "NO Authorization 1" })
        }
        
        const token = authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: "No Authorization 2" })
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
        
    } catch (error) {
        res.status(401).json({ message: "No Authorization 3" })
    }
}