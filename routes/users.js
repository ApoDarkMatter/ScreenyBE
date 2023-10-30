const express = require('express')
const UserModel = require('../models/user')
const user = express.Router()
const bcrypt = require('bcrypt')

user.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find()

        res.status(200).send({
            statusCode: 200,
            users
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

user.get('/users/:userId', async (req, res) => {
    const {userId} = req.params
    try {
        const users = await UserModel.findById(userId)

        if(!users) {
            return res.status(404).send({
                statusCode: 404,
                message: 'User Not Found'
            })
        }
        res.status(200).send({
            statusCode: 200,
            users
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

user.post('/users', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new UserModel({
        shopName: req.body.shopName,
        email: req.body.email,
        password: hashedPassword,
    })

    try {
        const user = await newUser.save()

        res.status(201).send({
            statusCode: 201,
            message: 'User Saved Correctly',
            user
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

user.patch('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const userExist = await UserModel.findById(userId)

    if(!userExist) {
        return res.status(404).send({
            statusCode: 404,
            message: 'User Not Found'
        })
    }

    try {
        const dataToUpdate = req.body
        const options = {new: true}
        const result = await UserModel.findByIdAndUpdate(userId, dataToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: 'User Updated Correctly',
            result
        })
    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
})

user.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params
    try {
        const user = await UserModel.findByIdAndDelete(userId)
        if(!user) {
            return res.statusCode(404).send({
                statusCode: 404,
                message: 'User Not Found or Already Deleted'
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: 'User Deleted Successfully'
        })
    } catch(e) {    
        res.status(500).send({
            statusCode: 500,
            mesasge: 'Internal Server Error'
        })
    }   
})

module.exports = user