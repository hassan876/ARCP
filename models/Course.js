const mongoose = require('mongoose');
const { number } = require('@hapi/joi');

const CourseSchema = mongoose.Schema({
    title: {
        type: String,
         lowercase: true,
        required: true ,
       
    }
    
    ,
    subTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    ImagePlaceholder: {
        type: String,
        default: 'https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80'
    },
    date: {
        type: Date,
        default: Date.now
    },
    publication_Status: {
        type: Number,
        default: 1
    },
    // act as a forign key
    educator_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'educator'
    }]


});

module.exports = mongoose.model('course', CourseSchema);