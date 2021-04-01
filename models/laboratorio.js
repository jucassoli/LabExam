const mongoose = require('../config/database').mongoose;
const Schema = mongoose.Schema;

const LabSchema = new Schema({
  nome: {
    type: String,
    index: true,
    required: true
  },
  endereco: {
    type: String,
    required: false
  },
  removido: {
    type: Boolean,
    default: false,
    required: true
  },
  status: {
    type: String,
    enum : ['ativo','inativo'],
    default: 'ativo',
    required: true
  }
});

module.exports = mongoose.model('laboratorio', LabSchema);