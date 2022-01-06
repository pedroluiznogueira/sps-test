const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../../config/auth");
const router = express.Router();

const generateToken = (params = {}) => {
    return jwt.sign(params, auth.secret, {
        expiresIn: 86400
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;

    console.log(req.body);

    try {
        if (await User.findOne( {email} ))
            return res.status(400).send({message: 'email already exists'})

        const user = await User.create(req.body); 

        // don't want to send password back
        user.password = undefined;

        const token = generateToken({ id: user.id });

        return res.status(301).send({status: 301, message: 'user created', user: user, token: token}); 
    } catch (err) {
        return res.status(404).send({status: 404, message: 'failed to create user', error: err.message});
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // revert the select = false property in model
        const user = await User.findOne( {email} ).select('+password');
        if (!user)
            return res.status(404).send({ error: 'user not found'});

        // compare given password with the registered password
        const compare = await bcrypt.compare(password, user.password);
        if (!compare)
            return res.status(404).send({ error: 'invalid password'});

        // removing it from response
        user.password = undefined;

        const token = generateToken({ id: user.id });

        return res.status(200).send({status: 200, message: 'user authenticated', user: user, token: token}); 
    } catch (err) {
        return res.status(404).send({status: 404, message: 'failed to authenticate', error: err.message});
    }
});

// base request mapping for user controller
module.exports = app => app.use('/users', router); 