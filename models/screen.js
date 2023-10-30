const mongoose = require('mongoose')

const ScreenSchema = new mongoose.Schema({
    screenName: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    timeScreen: {
        type: Boolean,
        default: false,
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    shopName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
},{ timestamps: true, strict: true })

module.exports = mongoose.model('ScreenModel', ScreenSchema, 'screen')