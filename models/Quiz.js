const mongoose = require('mongoose');
const QuizSchema = mongoose.Schema({

    question:{
        type: String  , 
        required: true
    }    , 
    option1:{
        type: String , 
        required: true
    }     , 
    option2:{
        type: String  , 
        required: true
    }   , 
    option3:{
        type: String  , 
        required: true
    }    , 
    option4:{
        type: String  , 
        required: true
    }   , 
    correctOption:{
        type: String , 
        required: true
    }
    , 
    exercise_id : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assessmentexercise'
    }]


});
module.exports = mongoose.model('quiz' , QuizSchema);