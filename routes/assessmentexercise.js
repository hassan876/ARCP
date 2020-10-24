const express = require('express');
const Topic  = require('../models/Topic');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
const { findById } = require('../models/Topic');
const AssessmentExercise = require('../models/AssessmentExercise');
Joi.objectId = require('joi-objectid')(Joi)
const router = express.Router();

/**
 * @route GET/ api/assessmentExercise 
 * * @description Get List of assessmentExercise
 * @access Private
 */

 router.get('/', async (req, res) => {

    const {topic_id} = req.body;
    const assessmentExercise = await AssessmentExercise.find({ topic_id: mongoose.Types.ObjectId(topic_id) });
    if(!assessmentExercise)
    {
    return (res.status(404).send('Topic id is invalid'));
    }
    else 
    {
     res.send(assessmentExercise);
    }

});

/**
 * @route GET/ api/coursestopic
 * @description Get single of courses
 * @access Private
 */

router.get('/:id', async (req, res) => {
       const assessmentExercise = await AssessmentExercise.findById(req.params.id);
     if (!assessmentExercise) {
         res.status(404).send('Assessment exercise Id is invalid');
        return;
     }
    else{
        res.send(assessmentExercise);
    }

});


/**
 * @route POST / api/coursestopic
 * @description Add coursetopic
 * @access Private
 */
router.post('/', async (req, res) => {
    
  
    const {topic_id,  exerciseTitle , exerciseSubTitle  } = req.body;
    
    try{
    assessmentExercise = new AssessmentExercise({
        topic_id , 
        exerciseTitle , 
        exerciseSubTitle 
    });
    await assessmentExercise.save();
    res.status(200).send(assessmentExercise);
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
router.put('/:id', async (req, res) => {

                const {exerciseTitle, exerciseSubTitle} = req.body;
                const updateAssessmentExercise = {};
                if(exerciseTitle){
                    updateAssessmentExercise.exerciseTitle = exerciseTitle;
                }
                if(exerciseSubTitle)
                {
                    updateAssessmentExercise.exerciseSubTitle = exerciseSubTitle;
                }
                try{
                const assessExercise = await AssessmentExercise.findById(req.params.id);
                if(!assessExercise)
                {
                    res.status(404).send('Assessment Exercise id is invalid');
                }

               const assessmentExercise = await AssessmentExercise.findByIdAndUpdate(req.params.id ,
                    {$set: updateAssessmentExercise} , 
                    {new: true});
                    
                
                    res.status(200).send('Assessment Exercise  updated');
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
        const assessmentExercise = await AssessmentExercise.findById(req.params.id);

        if (!assessmentExercise) return res.status(404).send('Assessment Exercise with this id does not exists' );
        await AssessmentExercise.findByIdAndRemove(req.params.id);
        res.status(200).json('Assessment Exercise deleted');

    } catch (err) {
        res.status(500).send('Server error');
    }
   
});


module.exports = router;