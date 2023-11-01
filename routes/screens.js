const express = require('express')
const screenModel = require('../models/screen')
const screen = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'screen',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.name,
    },
})

const cloudUpload = multer({storage: cloudStorage})

screen.post('/screen/cloudUpload', cloudUpload.single('screen'), async (req, res) => {
    try {
        res.status(200).json({cover: req.file.path})
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

screen.post('/screen', async (req, res) => {
    const newScreen = new screenModel({
        screenName: req.body.screenName,
        imgUrl: req.body.imgUrl,
        category: req.body.category,
        shopId: req.body.shopId
    })

    try {
        const screen = await new screenModel.save()

        res.status(201).send({
            statusCode: 201,
            message: 'Screen Saved Correctly',
            screen
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

screen.delete('/screen/:screenId', async (req, res) => {
    const {screenId} = req.params

    try {
        const screen = await screenModel.findByIdAndDelete(screenId)

        if(!screen) {
            return res.status(404).send({
                statausCode: 404,
                message: 'Screen Not Found'
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: 'Screen Deleted Succesfully'
        })

    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

module.exports = screen