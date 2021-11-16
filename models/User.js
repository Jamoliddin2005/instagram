const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DbUser = new Schema({
    name: {
        type: String
    },
    login: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    title: {
        type: String
    }
})

module.exports = mongoose.model('User', DbUser)