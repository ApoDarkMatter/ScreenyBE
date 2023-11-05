const mongoose = require('mongoose')

const ContainerSchema = new mongoose.Schema({
    containerName: {
        type: String,
        required: true,
    },
    shopId: {
        type: String,
        required: true
    }
},{ timestamps: true, strict: true })

module.exports = mongoose.model('ContainerModel', ContainerSchema, 'container')