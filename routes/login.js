const express = require('express')
const login = express.Router()
const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

login.post('/login', async (req,res) => {
    const user = await userModel.findOne({email: req.body.email})

    if(!user) {
        return res.status(404).send({
            statusCode: 404,
            message: 'User Not Found'
        })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword) {
        return res.status(404).send({
            statusCode: 404,
            message: 'User or Password Wrong'
        })
    }

    const token = jwt.sign({
        is: user._id,
        shopName: user.shopName,
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })

    res.header('Authorization', token).status(200).send({
        message: 'Login Successfully',
        statusCode: 200,
        token
    })
})

module.exports = login