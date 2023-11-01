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
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
},{ timestamps: true, strict: true })

module.exports = mongoose.model('ScreenModel', ScreenSchema, 'screen')