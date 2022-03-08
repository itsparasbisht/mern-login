const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltRounds = 10;
const myPlaintextPassword = 'amir20v@x$7cx1@1qwCvCDz^f';

router.post('/sign-up', async (req, res) => {
    try {
        const { username, password } = req.body

        const newUser = new User({ username, password })
        const data = await newUser.save()
        res.status(201).send({ username: data.username, message: "user created" })
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router