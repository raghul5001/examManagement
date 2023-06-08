const express = require("express");
const router = express.Router();
const user = require('./useroutes');
const subject = require('./subjectroutes');
const exam = require('./examroutes');
const classes = require('./classroutes')


router.use('/user', user);
router.use('/subject',subject);
router.use('/exam',exam);
router.use('/class',classes)

module.exports = router;