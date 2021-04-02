const mongoose = require('../config/database').mongoose;
const Schema = mongoose.Schema;

const LabExamSchema = new Schema({
  laboratorioId: [{ type: Schema.Types.ObjectId, ref: 'laboratorio' }],
  exameId: [{ type: Schema.Types.ObjectId, ref: 'exame' }],
  status: {
    type: String,
    enum : ['ativo','inativo'],
    default: 'ativo',
    required: true
  }
});

module.exports = mongoose.model('labExam', LabExamSchema);