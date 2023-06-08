const express = require('express');
const router= express.Router();

const {createExam ,updateExam ,deleteExam ,getExam} = require('../../controllers/exam')

const {validateExam} = require('../../validator/examvalid')
router.post('/createexam',validateExam,createExam);
router.get('/getexam',getExam);
router.put('/updatexam',updateExam);
router.delete('/deleteexam',deleteExam);


module.exports = router;
