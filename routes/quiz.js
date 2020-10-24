const express = require('express');
const auth = require('../middlewares/auth');
const Joi = require('@hapi/joi');
const Quiz = require('../models/Quiz');
const AssessmentExercise = require('../models/AssessmentExercise');
// const joiObjectid = require('joi-objectid');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi)
const validate = require('../util/mangoId-Validator');
const { update } = require('../models/Quiz');


const router = express.Router();


/**
 * @route Get / api/quizes
 * @description Get quiz
 * @access Private
 */
router.get('/' , auth , async (req , res)=>{
    
   let exercise_id = '';
    if (req.header('exercise_id')) {
        exercise_id = req.header('exercise_id');
    }
    else {
        exercise_id = req.body.exercise_id;
    }
    if (!validate(exercise_id)) {
        res.status(400).send('Please Provide Valid Exercise Id');
        return;
    }

    const quiz = await Quiz.find({ exercise_id: mongoose.Types.ObjectId(exercise_id) });
    if (!quiz)
        return (res.status(404).send('Exercise Id is Invalid'));
    else res.send(quiz);

});
/**
 * @route GET / api/quizes
 * @description get quiz
 * @access Private
 */
router.get('/:id' , auth , async(req , res)=>{

    if(!validate(req.params.id))
    {
     res.status(400).send("Please Provide Valid Id");   
    }
    const quiz = await Quiz.findById(req.params.id);
    if(!quiz)
    {
        return res.status(404).send("Quiz does not exists");
    }
    else{
        res.status(200).send(quiz);
    }

} );

/**
 * @route POST / api/quizes
 * @description Add quiz
 * @access Private
 */
router.post('/' , auth , async (req , res)=>{

 
    let { error } = quizValidationSchema.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const {exercise_id, question , option1 , option2  , option3 , option4 , correctOption}  = req.body;
    const exercise = AssessmentExercise.findById(exercise_id);
    if(!exercise)
    {
        return res.status(404).send("Exercise id is not valid");
    }
    try{
    const quiz = new Quiz({
        exercise_id , 
        question ,
        option1 ,
        option2 ,
        option3 ,
        option4 ,
        correctOption ,
    });
    await quiz.save();
    res.status(200).send(quiz);
    }catch(error){
        res.status(500).send("Server error");
    }
});

/**
 * @route PUT / api/quizes
 * @description Delete quiz
 * @access Private
 */
router.put('/:id' , auth , async (req , res)=> {
    if(!validate(req.params.id))
    {
     return res.status(400).send("Please Provide Valid Id");   
    }
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) return res.status(404).send('Quiz with this id does not exists');
    const {question , option1 , option2  , option3 , option4 , correctOption}  = req.body;
    
    const updateQuiz = {};
        if(question)
        {
            updateQuiz.question = question;
        }
        if(option1)
        {
            updateQuiz.option1 = option1;
        }
        if(option2)
        {
            updateQuiz.option2 = option2;
        }
        if(option3)
        {
            updateQuiz.option3 = option3;
        }
        if(option4)
        {
            updateQuiz.option4 = option4;
        }
        if(correctOption)
        {
            updateQuiz.correctOption = correctOption;
        }
        
        await Quiz.findByIdAndUpdate(req.params.id , {$set: updateQuiz} , {mew: true} );
      res.status(200).send('Quiz Question updated');
});



 /**
 * @route Delete / api/quizes
 * @description Delete quiz
 * @access Private
 */
router.delete('/:id' , auth , async (req , res)=>{
    if(!validate(req.params.id))
    {
     return res.status(400).send("Please Provide Valid Id");   
    }
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) return res.status(404).send('Quiz with this id does not exists');

    await Quiz.findByIdAndRemove(req.params.id);
    res.status(200).send("Quiz removed successfully");
});

// Schema Validation 
const quizValidationSchema = Joi.object({
  
    exercise_id: Joi.objectId().required().label('Exercise id') , 
    question: Joi.string().min(1).max(300).required().label('Question'),
    option1: Joi.string().min(1).max(100).required().label('Option1') ,
    option2: Joi.string().min(1).max(100).required().label('Option2') ,
    option3: Joi.string().min(1).max(100).required().label('Option3') ,
    option4: Joi.string().min(1).max(100).required().label('Option4') ,
    correctOption: Joi.string().min(1).max(100).required().label('correctOption') ,
    date: Joi.date()

});
module.exports = router;