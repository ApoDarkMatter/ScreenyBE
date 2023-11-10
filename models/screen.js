const mongoose = require('mongoose')

const ScreenSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: true,
    },
    text: {
        type: String
    },
    container: {
        type: String,
        required: true,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
},{ timestamps: true, strict: true })

module.exports = mongoose.model('ScreenModel', ScreenSchema, 'screen')