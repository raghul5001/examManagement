const express = require('express');
const router= express.Router();

const {createSubject ,getSubject ,updateSubject ,deleteSubject} = require('../../controllers/subject')
const {validateSubject} = require('../../validator/subjectvalid')

router.post('/createSubject',validateSubject,createSubject);
router.get('/getsubject',getSubject);
router.put('/updatesubject',updateSubject);
router.delete('/deletesubject',deleteSubject);

module.exports = router;
