const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const morgan = require('morgan');

app.use('/api/uploads', express.static('uploads'))
// Connect DataBase
connectDB();

app.use(morgan('dev'));
// Init Middleware
app.use(express.json({ extended: false }));


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header("Access-Control-Allow-Headers", "*");
//     if (req.method === 'OPTIONS') {
//         res.header("Access-Control-Allow-Methods", 'PUT , PATCH , POST , DELETE , GET');
//         res.status(200).json({

//         })
//     }
//     next();
// });

app.use('/api/educators', require('./routes/educator'));
app.use('/api/learners', require('./routes/learner'));
app.use('/api/auth/educator', require('./routes/auth/educator'));
app.use('/api/auth/learner', require('./routes/auth/learner'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/coursetopics', require('./routes/coursetopics'));
app.use('/api/registeredcourses', require('./routes/registeredcourses'));
app.use('/api/assessmentexercise', require('./routes/assessmentexercise'));
app.use('/api/courseunregister', require('./routes/courseunregister'));
app.use('/api/quiz', require('./routes/quiz'));



// app.use((req, res, next) => {
//     const error = new Error('not found');
//     res.status = 404;
//     next(error)
// });

// app.use((error, req, res, next) => {
//     res.status({error.status || 500});
//     res.json({
//         error: {
//             message: error.message
//         }
//     });
// })
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('front-end/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'))
    })
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log('server started on port' + PORT) });