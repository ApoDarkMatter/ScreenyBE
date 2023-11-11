const mongoose = require('mongoose')

const ScreenSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    containerId: {
        type: String,
        required: true,
    },
    shopId: {
        type: String,
        required: true,
    }
},{ timestamps: true, strict: true })

module.exports = mongoose.model('ScreenModel', ScreenSchema, 'screen')