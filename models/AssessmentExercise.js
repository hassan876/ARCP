const mongoose = require('mongoose');
const { number } = require('@hapi/joi');

const assessmentExerciseSchema = mongoose.Schema({
    exerciseTitle: {
        type: String,
         lowercase: true,
        required: true ,
       
    }
    
    ,
    exerciseSubTitle: {
        type: String,
        required: true,
    },

   
    // act as a forign key
    topic_id : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic'
    }]


});

module.exports = mongoose.model('assessmentexercise', assessmentExerciseSchema);