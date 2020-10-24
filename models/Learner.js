const mongoose = require('mongoose');

const LearnerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('learner', LearnerSchema);