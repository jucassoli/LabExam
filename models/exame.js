const mongoose = require('../config/database').mongoose;
const Schema = mongoose.Schema;

const ExameSchema = new Schema({
  nome: {
    type: String,
    index: true,
    required: true
  },
  tipo: {
    type: String,
    enum : ['analise_clinica','imagem'],
    default: 'imagem',
    required: true
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

module.exports = mongoose.model('exame', ExameSchema);