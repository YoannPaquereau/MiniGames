const dotenv = require('dotenv').config({path: __dirname + '/../.env'})

module.exports = {
    mongoURI: process.env.MONGOURI,
    secretOrKey: process.env.SECRETORKEY
}