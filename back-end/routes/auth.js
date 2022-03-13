const express = require('express')
const router = express.Router()

const User = require('../models/User');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const privateKey = "*&ghgds_12WWe&TgFt@1gguDCXXzwE:kjikohi"

router.post('/sign-up', async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (user) {
            res.status(200).send({ message: "username exists" })
        }
        else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    throw err
                }
                else {
                    const password = hash
                    const newUser = await User.create({ username, password })

                    const payload = {
                        username: newUser.username,
                        id: newUser.id
                    }

                    jwt.sign(payload, privateKey, { algorithm: 'HS256' }, function (err, token) {
                        if (err) {
                            throw err
                        }
                        // send the cookie
                        res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 * 2, httpOnly: true });
                        res.status(201).send({ username: newUser.username, message: "user created" })
                    });
                }
            });
        }
    }
    catch (error) {
        console.log(">>>", error.message)
        res.status(500).send({ message: "Intrnal server error" })
    }
})

module.exports = router