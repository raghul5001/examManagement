const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  
});

const Subject = mongoose.model('Class', classSchema);

module.exports = Subject;
