const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Learner = require('../models/Learner');


router.post('/', async (req, res) => {
    // Validating the Request body 
    let { error } = learnerValidationSchema.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    // Pulling required Information from the Request 
    const { name, email, password } = req.body;

    try {
        // Find User already exists or not
        const isRegistered = await Learner.findOne({ email });

        if (isRegistered) {
            res.status(400).send('User Already Exists');
        }

        user = new Learner({
            name,
            email,
            password
        });

        // Hasing password
        const salt = await bcrypt.genSalt(10);
        // hassing User password by providing planepassword and salt
        user.password = await bcrypt.hash(password, salt);

        // Saving User In the database
        await user.save();

        // creating payload for jwt
        const payload = {
            user: {
                id: user.id
            }
        }

        //Creating Jwt With payload and Secret Key 
        jwt.sign(payload, config.get('jwtSecret'), {
            // options
            expiresIn: 3600
        }, (err, token) => {
            if (err) {
                throw err;
            }
            // returning token
            res.json({ token });
        });


    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
});


// Schema Validation 
const learnerValidationSchema = Joi.object({
    name: Joi.string().min(1).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().max(20),
});

module.exports = router;