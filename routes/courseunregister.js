const express = require('express');
const RegisterCourse = require('../models/RegisterCourse');
const auth = require('../middlewares/auth');
const router = express.Router();
const learner = require('../models/Learner');

/**
 * @route DELETE / api/course
 * @description remove course
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
       const courseUnRegister = await RegisterCourse.findById(req.params.id);

        if (!courseUnRegister) return res.status(404).json({ msg: 'Course with this id does not exists' });

        
        if (courseUnRegister.learner_id.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Not authorized' });

        await RegisterCourse.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: 'Course successfully unregistered' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;