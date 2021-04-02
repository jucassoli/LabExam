const Exame = require("../models/exame");
const common = require("../common/common");

exports.getAllExams = (req, res) => {
  // #swagger.tags = ['Exames']
  // #swagger.description = 'Endpoint usado para obter uma lista de Exames, podendo ser todos ou filtrado.'
  /* 
    #swagger.parameters['removido'] = {
                in: 'query',
                type: "string",
                description: "Indicador de Exame removido"
        } 
    #swagger.parameters['status'] = {
                in: 'query',
                type: "string",
                description: "Status <code>ativo</code> ou <code>inativo</code>",
                enum : ['ativo','inativo']
        } 
    #swagger.parameters['tipo'] = {
                in: 'query',
                type: "string",
                description: "Pode ser <code>analise_clinica</code> ou <code>imagem</code>",
                enum : ['analise_clinica','imagem']
        } 
    #swagger.parameters['nome'] = {
                in: 'query',
                type: "string",
                description: "Nome do Exame"
        } 
    #swagger.parameters['limit'] = {
                in: 'query',
                type: "integer",
                description: "Tamanho limite da pagina"
        } 
    #swagger.parameters['page'] = {
                in: 'query',
                type: "integer",
                description: "Pagina corrente"
        } 
  */

  let filter = Object.assign({},
    (req.query.removido) ? { removido: req.query.removido } : { removido: false },
    (req.query.status) && { status: req.query.status },
    (req.query.tipo) && { tipo: req.query.tipo },
    (req.query.nome) && { nome: req.query.nome }
  );

  let schema = Exame.find(filter);

  if (req.query.limit) {
    let limit = req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;

    if (req.query.page) {
      let pageNum = parseInt(req.query.page);
      page = Number.isInteger(pageNum) ? pageNum : 0;
    }

    schema.limit(limit).skip(limit * page);
  }

  schema.exec(function (err, data) {
    if (err) {
      res.status(500).send(err);
    }
    if (Array.isArray(data) && data.length == 0) {
      res.status(404).send();
    } else {
      res.json(common.fixResponseData(data));
    }
  });

};

exports.deleteExam = (req, res) => {
  // #swagger.tags = ['Exames']

  let data = { removido: true };
  let id = req.params.id;

  Exame.findOneAndUpdate({ _id: id }, data)
    .exec()
    .then(result => {
      res.status(200).send();
    }).catch(err => {
      if (err.reason && Object.keys(err.reason).length === 0) {
        res.status(404).send();
      } else {
        res.status(500).send(err);
      }
    });

};

exports.createExam = (req, res) => {
  // #swagger.tags = ['Exames']

  let data = req.body;

  if (Array.isArray(data)) {
    let aditionsArray = [];
    for (let item of data) {
      aditionsArray.push(createSingle(item, Exame));
    }
    Promise.all(aditionsArray).then(result => {
      res.status(201).json({ "created": common.fixResponseData(result) });
    }).catch(err => {
      res.status(500).send(err);
    });

  } else {
    createSingle(data, Exame).then(result => {
      res.status(201).json({ "created": common.fixResponseData(result) });
    }).catch(err => {
      if (common.isValidationError(err)) {
        res.status(400)
      } else {
        res.status(500)
      }
      res.send(err);
    });
  }

};

let createSingle = (data, ExamSchema) => {
  return new Promise((resolve, reject) => {
    let newLab = new ExamSchema(data);
    newLab.save((err) => {
      if (err) {
        reject({ isSuccess: false, err });
      } else {
        resolve({ isSuccess: true, exame: common.fixResponseData(newLab) });
      }
    });
  });
};

exports.updateExam = (req, res) => {
  // #swagger.tags = ['Exames']

  let data = req.body;
  let id = req.params.id;

  Exame.findOneAndUpdate({ _id: id }, data, { runValidators: true })
    .exec()
    .then(result => {
      res.status(200).json(common.fixResponseData(result));
    }).catch(err => {
      if (common.isValidationError(err)) {
        res.status(400)
      } else {
        res.status(500)
      }
      res.send(err);
    });

};

exports.findById = (req, res) => {
  // #swagger.tags = ['Exames']

  let id = req.params.id;
  Exame.find({ "_id": id }).exec(function (err, data) {
    if (err) {
      if (err.reason && Object.keys(err.reason).length === 0) {
        res.status(404).send();
      } else {
        res.status(500).send(err);
      }
    } else {
      res.json(common.fixResponseData(data));
    }
  });
};

