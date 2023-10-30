const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    }
},{ timestamps: true, strict: true })

module.exports = mongoose.model('userModel', UserSchema, 'user')