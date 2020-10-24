const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Educator = require('../../models/Educator');
const auth = require('../../middlewares/auth');

const router = express.Router();

/**
 * @route GET/ api/auth/educator
 * @description Get Loged In user
 * @access Private
 */
router.get('/',
    // MiddleWare Functions for exteracion of User Information from Token
    auth,
    async (req, res) => {
        try {
            // Getting all user data except User Password
            // prehaps - Sign is used conjection of attribute, that have t0 be ommoted
            const user = await Educator.findById(req.user.id)
                .select('-password');
            res.send(user)
        } catch (error) {
            res.status(500).send('Server Error');
        }


    });

/**
 * @route POST / api/auth
 * @description Authorize user & get token
 * @access Public
 */
router.post('/', async (req, res) => {
    // Validating Request Body
    const { error } = signInValidationSchema.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    // Pulling the info from req body
    const { email, password } = req.body;

    try {
        // Finding user in Database 
        let user = await Educator.findOne({ email });

        if (!user) {
            res.status(400).json({ msg: "Invalid Credentials" })
        }
        // Matching  provided Password with hashed password stored in the database 
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({ msg: "Invalid Credentials" });
        }
        // Create Payload for JWT
        const payload = {
            user: {
                id: user.id
            }
        }
        // creating JWT
        jwt.sign(payload, config.get('jwtSecret'), {
            // Options
            expiresIn: 3600
        }, (err, token) => {
            if (err) {
                throw err;
            }
            // Returning Token
            res.json({ token });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});
// Schema Validation Object
const signInValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().max(20),
});

module.exports = router;