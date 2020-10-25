const express = require('express');
const Course = require('../models/Course');
const auth = require('../middlewares/auth');
const RegisterCourse = require('../models/RegisterCourse');
const router = express.Router();

/**
 * @route DELETE / api/cou
 * rse
 * @description remove course
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        const courseID = req.params.id;
        const courseUnRegister = await  RegisterCourse.find({"course_id": courseID});
      
        console.log(courseUnRegister);
        if (!courseUnRegister) return res.status(404).json({ msg: 'Course with this id does not exists' });

        // Make sure user owns course
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