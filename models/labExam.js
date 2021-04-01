const mongoose = require('../config/database').mongoose;
const Schema = mongoose.Schema;

const LabExamSchema = new Schema({
  laboratorioId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  exameId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('labExam', LabExamSchema);