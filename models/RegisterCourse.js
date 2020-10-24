const mongoose = require('mongoose');
const RegisterCourseSchema = mongoose.Schema({

    registerationDate: {
        type: Date,
        default: Date.now
    },
    course_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }],
    learner_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'learner'
    }]


});

module.exports = mongoose.model('RegisterCourse', RegisterCourseSchema);
