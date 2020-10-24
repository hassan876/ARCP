const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const Educator = require('../models/Educator');

/**
 * @route POST/ api/user
 * @description Register a user
 * @access public
 */
router.post('/',
    async (req, res) => {
        // Validating the Request body 
        // let { error } = educatorValidationSchema.validate(req.body);
        // if (error) { return res.status(400).send(error.details[0].message) }
        // Pulling required Information from the Request 
        const { name, email, password } = req.body;

        try {
            // Finding User In the Database
            let educator = await Educator.findOne({ email });

            if (educator) {
                return res.status(400).json({ msg: 'User Already Exist' });
            }

            // Creation object of the Educator Model
            user = new Educator({
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

            // Creating palyload for Json Web Token in this payload we simply add user id

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


        }
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    });

// Schema Validation 
const educatorValidationSchema = Joi.object({
    name: Joi.string().min(1).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().max(20),
});

module.exports = router;