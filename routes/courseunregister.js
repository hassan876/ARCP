const express = require('express');
const Course = require('../models/Course');
const auth = require('../middlewares/auth');
const router = express.Router();

/**
 * @route DELETE / api/course
 * @description remove course
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
       const courseUnRegister = await Course.findById(req.params.id);

        if (!courseUnRegister) return res.status(404).json({ msg: 'Course with this id does not exists' });

        // Make sure user owns course
        if (courseUnRegister.learner_id.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Not authorized' });

        await Course.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: 'Course successfully unregistered' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;