const mongoose = require("mongoose");
const { number } = require('@hapi/joi');

const topicSchema = mongoose.Schema({

    TopicTitle:{
        type: String,
        required: true
    }
    ,
    TopicDescription: {
        type: String,
        required: true
    }
    ,
  
    //Foreign key

    course_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }]
});
module.exports = mongoose.model('topic' , topicSchema);