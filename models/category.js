const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    categoryName: {
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
    shopId: {
        type: String,
        required: true
    }
},{ timestamps: true, strict: true })

module.exports = mongoose.model('CategoryModel', CategorySchema, 'category')