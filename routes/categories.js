const express = require('express')
const CategoryModel = require('../models/category')
const category = express.Router()

category.get('/categories', async (req, res) => {
    try {
        const categories = await CategoryModel.find()

        res.status(200).send({
            statusCode: 200,
            categories
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

category.get('/categories/:categoryId', async (req, res) => {
    const {userId} = req.params
    try {
        const categories = await CategoryModel.findById(categoryId)

        if(!categories) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Categeory Not Found'
            })
        }
        res.status(200).send({
            statusCode: 200,
            categories
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

category.post('/categories', async (req, res) => {

    const newCategory = new CategoryModel({
        categoryName: req.body.categoryName,
        timeScreen: req.body.timeScreen,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        shopId: req.body.shopId
    })

    try {
        const categoy = await newCategory.save()

        res.status(201).send({
            statusCode: 201,
            message: 'Category Saved Correctly',
            categoy
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

category.patch('/categories/:categoryId', async (req, res) => {
    const {categoryId} = req.params
    const categoryExist = await CategoryModel.findById(categoryId)

    if(!categoryExist) {
        return res.status(404).send({
            statusCode: 404,
            message: 'Category Not Found'
        })
    }

    try {
        const dataToUpdate = req.body
        const options = {new: true}
        const result = await CategoryModel.findByIdAndUpdate(categoryId, dataToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: 'Category Updated Correctly',
            result
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

category.delete('/categories/:categoryId', async (req, res) => {
    const {categoryId} = req.params
    try {
        const category = await CategoryModel.findByIdAndDelete(categoryId)
        if(!category) {
            return res.statusCode(404).send({
                statusCode: 404,
                message: 'Category Not Found or Already Deleted'
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: 'Category Deleted Successfully'
        })
    } catch(e) {    
        res.status(500).send({
            statusCode: 500,
            mesasge: 'Internal Server Error'
        })
    }   
})

module.exports = category