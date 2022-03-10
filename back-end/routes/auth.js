const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltRounds = 10;
const myPlaintextPassword = 'amir20v@x$7cx1@1qwCvCDz^f';

router.post('/sign-up', async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (user) {
            res.status(200).send({ message: "username exists" })
        }
        else {
            const newUser = await User.create({ username, password })
            res.status(201).send({ username: newUser.username, message: "user created" })
        }
    }
    catch (error) {
        console.log(">>>", error.message)
        res.status(500).send({ message: "Intrnal server error" })
    }
})

module.exports = router