const express = require('express');
const Topic  = require('../models/Topic');
const Course = require('../models/Course')
const mongoose = require('mongoose');
// const Course = require('../models/Course');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
const { findById } = require('../models/Topic');
Joi.objectId = require('joi-objectid')(Joi)
const validate = require('../util/mangoId-Validator');
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true)
//     }
//     else {
//         cb(null, false);
//     }
// }
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 4
//     },
//     fileFilter: fileFilter
// });

const router = express.Router();

/**
 * @route GET/ api/coursetopic 
 * * @description Get List of coursestopics
 * @access Private
 */
router.get('/', async (req, res) => {

    let course_id = '';
    if (req.header('course_id')) {
        course_id = req.header('course_id');
    }
    else {
        course_id = req.body.course_id;
    }

    // const { course_id } = req.body;

    if (!validate(course_id)) {
        res.status(400).send('Please Provide Valid Course Id');
        return;
    }

    const topic = await Topic.find({ course_id: mongoose.Types.ObjectId(course_id) });
    if (!topic)
        return (res.status(404).send('Course id is invalid'));
    else res.send(topic);

});
/**
 * @route GET/ api/coursestopic
 * @description Get single of courses
 * @access Private
 */
router.get('/:id', auth ,  async (req, res) => {
    if (!validate(req.params.id)) {
        return   res.status(400).send('Please Provide Valid Id... ');
    }
    const topic = await Topic.findById(req.params.id);
    if(!topic)
    {
      return  res.status(404).send('topic id is invalid');
    }
    res.send(topic);
});


/**
 * @route POST / api/coursestopic
 * @description Add coursetopic
 * @access Private
 */
router.post('/', async (req, res) => {
    let { error } = topicSchemaValidation.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const {course_id,  TopicTitle , TopicDescription } = req.body;
      const course = await Course.findById(course_id);
    if (!course) {
        res.status(404).send('course id is incorrect');
        return;
    }
    try{
    topic = new Topic({
        course_id , 
        TopicTitle , 
        TopicDescription
    });
    await topic.save();
    res.status(200).send(topic);
    }
    catch (error) {
    res.status(500).send('Server Error');
}
    // }
    //     catch (error) {
    //     res.status(500).send('Server Error');
    // }
});

/**
 * @route Put / api/courses/:id
 * @description update course
 * @access Private
 */
router.put('/:id', auth , async (req, res) => {
    if(!validate(req.params.id))
    {
     return res.status(400).send("Please Provide Valid Id");   
    }
    const topic = await Topic.findById(req.params.id);

    if (!topic) return res.status(404).send('Topic with this id does not exists');
    const {TopicTitle, TopicDescription} = req.body;
                const updateTopic = {};
                if(TopicTitle){
                    updateTopic.TopicTitle = TopicTitle;
                }
                if(TopicDescription)
                {
                    updateTopic.TopicDescription = TopicDescription;
                }
                try{
                const topic = await Topic.findById(req.params.id);
                if(!topic)
                {
                    res.status(404).send('Topic id is invalid');
                }

               const coursetopic = await Topic.findByIdAndUpdate(req.params.id ,
                    {$set: updateTopic} , 
                    {new: true});
                    
                
                    res.status(200).send('Course topic updated');
                    console.log('successful');
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
router.delete('/:id', async (req, res) => {
    try {
        if(!validate(req.params.id))
        {
         return res.status(400).send("Please Provide Valid Id");   
        }
        const topic = await Topic.findById(req.params.id);

        if (!topic) return res.status(404).send('Topic with this id does not exists' );

        // // Make sure user owns course
        // if (course.educator_id.toString() !== req.user.id)

        
        //     return res.status(401).json({ msg: 'Not authorized' });

        await Topic.findByIdAndRemove(req.params.id);
        res.status(200).json('Topic deleted');

    } catch (err) {
        res.status(500).send('Server error');
    }
   
});

// Schema Validation
const topicSchemaValidation = Joi.object({
    course_id: Joi.objectId().required().label('Course Id') ,
    TopicTitle: Joi.string().max(200).required().label('Title'),
    TopicDescription : Joi.string().required().label('Description')
    
});
module.exports = router;