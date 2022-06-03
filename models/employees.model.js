const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: {type: String, required: true },
  departanent: {type: String, required: true, ref: 'Department'}
});

module.exports = mongoose.model('Employee', employeeSchema);