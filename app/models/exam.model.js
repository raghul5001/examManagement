const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
  },
  
});

const Subject = mongoose.model('Exam', examSchema);

module.exports = Subject;
