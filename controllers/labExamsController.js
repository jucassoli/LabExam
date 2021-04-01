const LabExam = require("../models/labExam");
const Lab = require("../models/laboratorio");
const Exame = require("../models/exame");

const common = require("../common/common");

exports.associate = (req, res) => {
  let data = req.body;

  if (Array.isArray(data)) {
    let aditionsArray = [];
    for (let item of data) {
      aditionsArray.push(createSingle(item, LabExam));
    }
    Promise.all(aditionsArray).then(result => {
      res.status(201).json({ "created": common.fixResponseData(result) });
    }).catch(err => {
      res.status(500).send(err);
    });

  } else {
    createSingle(data, LabExam).then(result => {
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

let createSingle = (data, LabExamSchema) => {
  return new Promise((resolve, reject) => {
    let newLabExam = new LabExamSchema(data);
    newLabExam.save((err) => {
      if (err) {
        reject({ isSuccess: false, err });
      } else {
        resolve({ isSuccess: true, exame: common.fixResponseData(newLabExam) });
      }
    });
  });
};

exports.findById = (req, res) => {
  let id = req.params.id;
  LabExam.find({ "_id": id }).exec(function (err, data) {
    if (err) {
      if(err.reason && Object.keys(err.reason).length === 0) {
          res.status(404).send();
      } else {
        res.status(500).send(err);
      }
    } else {
      res.json(common.fixResponseData(data));
    }
  });
};

exports.findExamsByNome = (req, res) => {

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

  schema.exec(function (err, examsFound) {
    if (err) {
      res.status(500).send(err);
    }
    if (Array.isArray(examsFound) && examsFound.length == 0) {
      res.status(404).send();
    } else {

      if(Array.isArray(examsFound) && examsFound.length > 0) {

        examsFound.forEach(oneExam => {
          let exameId = oneExam._id;
          LabExam.find({ exameId }).exec(labExamsFound => {

            if(Array.isArray(labExamsFound) && labExamsFound.length > 0) {

              let resultLabs = [];
              labExamsFound.forEach(oneLabExam => {
                let laboratorioId = oneLabExam.laboratorioId;
                Lab.findById(laboratorioId).exec(oneLabFound => {
                  resultLabs.push(common.fixResponseData(oneLabFound));
                });
              });
              Object.assign(common.fixResponseData(oneExam), { laboratorios_associados: resultLabs })
            }
          });

        });

      }

      res.json(examsFound);
    }
  });

};