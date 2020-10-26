const express = require('express');
const Course = require('../models/Course');
const auth = require('../middlewares/auth');
const RegisterCourse = require('../models/RegisterCourse');
const { isValidObjectId } = require('mongoose');
const { object } = require('@hapi/joi');
const router = express.Router();

/**
 * @route DELETE / api/cou
 * rse
 * @description remove course
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        const courseID = req.params.id;
    
        const courseUnregister = await RegisterCourse.find({course_id: courseID});
        if(courseUnregister.length==0)
        {
          return  res.status(404).send("not found");
        }
        const learner_id = courseUnregister[0].learner_id.toString();
        if (learner_id !== req.user.id)
        return res.status(401).send("un authorized user");
        

        await RegisterCourse.deleteOne({course_id: courseID , learner_id: req.user.id});
        res.status(200).send("un registered");




      

        // //  await RegisterCourse.deleteMany({ course_id: courseID}).then((operration) => {
        // //     if(operration.ok === 1){
        // //         res.status(200);
        // //     }
        // //     else{
        // //         res.status(500).send('Unregisteration Failed. it\' server error. ');
        // //     }
        // // });
       

        // const quere = {learner_id : req.user.id , course_id: courseID};
        // console.log(quere);
        // // await RegisterCourse.deleteMany(quere , function(err , obj) {
        // //     if (err) throw err;
            
        // // });
      
        

    } catch (err) {
        console.error(err.message);
       return res.status(500).send('Server error');
    }

});

module.exports = router;