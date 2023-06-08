const express = require('express');
const router= express.Router();

const {createClass , mapClassToSubject ,mapClassToSubjectExam} = require('../../controllers/class')

router.post('/createClass',createClass);
router.post('/mapclasssubject',mapClassToSubject);
router.post('/mapclassexamsubject',mapClassToSubjectExam)

module.exports = router;
