const express = require('express')
const ContainerModel = require('../models/screen_container')
const container = express.Router()

container.get('/containers', async (req, res) => {
    try {
        const container = await ContainerModel.find()

        res.status(200).send({
            statusCode: 200,
            container
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

container.get('/containers/:containersId', async (req, res) => {
    const {userId} = req.params
    try {
        const containers = await ContainerModel.findById(containersId)

        if(!containers) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Categeory Not Found'
            })
        }
        res.status(200).send({
            statusCode: 200,
            containers
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

container.post('/containers', async (req, res) => {

    const newContainer = new ContainerModel({
        containerName: req.body.categoryName,
        shopId: req.body.shopId
    })

    try {
        const containers = await newContainer.save()

        res.status(201).send({
            statusCode: 201,
            message: 'Container Saved Correctly',
            containers
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

container.patch('/containers/:containerId', async (req, res) => {
    const {containerId} = req.params
    const containerExist = await ContainerModel.findById(containerId)

    if(!containerExist) {
        return res.status(404).send({
            statusCode: 404,
            message: 'Category Not Found'
        })
    }

    try {
        const dataToUpdate = req.body
        const options = {new: true}
        const result = await ContainerModel.findByIdAndUpdate(containerId, dataToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: 'Container Updated Correctly',
            result
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

container.delete('/containers/:containerId', async (req, res) => {
    const {containerId} = req.params
    try {
        const container = await ContainerModel.findByIdAndDelete(containerId)
        if(!container) {
            return res.statusCode(404).send({
                statusCode: 404,
                message: 'Container Not Found or Already Deleted'
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: 'Container Deleted Successfully'
        })
    } catch(e) {    
        res.status(500).send({
            statusCode: 500,
            mesasge: 'Internal Server Error'
        })
    }   
})

module.exports = container