const express = require('express');

const Course = require('../models/Course');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
Joi.objectId = require('joi-objectid')(Joi)
const multer = require('multer');
const { string } = require('@hapi/joi');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 4
    },
    fileFilter: fileFilter
});

const router = express.Router();

/**
 * @route GET/ api/courses
 * @description Get List of courses
 * @access Private
 */
router.get('/', auth, async (req, res) => {
    const course = await Course
        .find({ educator_id: req.user.id })
        .populate('educator_id', '-password')
        .sort('date');
    res.send(course);
});
/**
 * @route GET/ api/courses
 * @description Get single of courses
 * @access Private
 */
router.get('/:id', auth, async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        res.status(404).send('Ooops required Course is not existing in the server');
        return;
    }
    res.send(course);
});

/**
 * @route POST / api/courses
 * @description Add course
 * @access Private
 */
router.post('/', auth, upload.single('ImagePlaceholder'), async (req, res) => {
    let { error } = courseValidationSchema.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    // Pulling required Information from the Request 
    const { title , subTitle , description} = req.body;

    // const strTitle = String(title).trim().toLowerCase();
    // const existingCourse = await  Course.find({"title": strTitle});
    // console.log(existingCourse.title===strTitle);
    // if(existingCourse.length>0)
    // {
    //     res.send("course name already exists");
    //     console.log(existingCourse);
    // }else{
    try {
        // Creation object of the Course Model
        course = new Course({
            title,
            subTitle,
            description,
            educator_id: req.user.id,
            ImagePlaceholder: (req.file && req.file.path
                ?
                req.file.path
                :
                'https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80')
        });

        await course.save();

        res.status(200).send(course);
    }
    catch (error) {
        res.status(500).send('Server Error');
    }
// }
});

/**
 * @route Put / api/courses/:id
 * @description update course
 * @access Private
 */
router.put('/:id', auth, async (req, res) => {

    // let { error } = courseValidationSchema.validate(req.body);
    // console.log('looking for')
    // if (error) { return res.status(400).send(error.details[0].message) }
    // Pulling required Information from the Request

    const { title, subTitle, description } = req.body;

    // Build contact object
    const updatedCourse = {};
    if (title) updatedCourse.title = title;
    if (subTitle) updatedCourse.subTitle = subTitle;
    if (description) updatedCourse.description = description;

    try {

        let course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ msg: 'Course not found' });

        // Make sure user owns contact
        if (course.educator_id.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Not authorized' });

        course = await Course.findByIdAndUpdate(
            req.params.id,
            { $set: updatedCourse },
            { new: true });

        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

/**
 * @route DELETE / api/course
 * @description remove course
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ msg: 'Course with this id does not exists' });

        // Make sure user owns course
        if (course.educator_id.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Not authorized' });

        await Course.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: 'Course removed' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// Schema Validation 
const courseValidationSchema = Joi.object({
    title: Joi.string()
        .min(1).max(50).required(),
    subTitle: Joi.string().min(1).max(50).required(),
    description: Joi.string().required().max(300),
    ImagePlaceholder: Joi.string(),
    date: Joi.date(),
    educator_id: Joi.objectId()
});
module.exports = router;