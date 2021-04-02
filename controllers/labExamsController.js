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
  LabExam.find({ "_id": id }).populate('laboratorioId').populate('exameId').exec(function (err, data) {
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

exports.deleteAssociacao = (req, res) => {
  let id = req.params.id;
  LabExam.findByIdAndDelete(id, function (err, data) {
    if (err) {
      if(err.reason && Object.keys(err.reason).length === 0) {
          res.status(404).send();
      } else {
        res.status(500).send(err);
      }
    } else {
      res.status(200).json(common.fixResponseData(data));
    }
  });
};

exports.findAll = (req, res) => {
  LabExam.find().populate('laboratorioId').populate('exameId').exec(function (err, data) {
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

  let examSchema = Exame.find(filter);

  if (req.query.limit) {
    let limit = req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;

    if (req.query.page) {
      let pageNum = parseInt(req.query.page);
      page = Number.isInteger(pageNum) ? pageNum : 0;
    }

    examSchema.limit(limit).skip(limit * page);
  }

  new Promise((resolve, reject) => {
    examSchema.exec(function (err, examsFound) {
      if (err) {
        reject(err); //res.status(500).send(err);
      } else {
        let mainExamsResponseArr = [];
        if (Array.isArray(examsFound) && examsFound.length > 0) {
          for(const oneExam of examsFound) {
            let examObject = common.fixResponseData(oneExam);
            Object.assign(examObject, { laboratorios_associados: [] });
            mainExamsResponseArr.push(examObject);
          }
        }
        if(mainExamsResponseArr.length == 0) {
          reject('');
        } {
          resolve(mainExamsResponseArr);
        }
      }
    });

  }).then(mainExamsResponseArr => {

    return new Promise((resolve, reject) => { 
      
      let examElementsProms = mainExamsResponseArr.map(examObject => { 
          // map each exam with its labexams
          return new Promise((resolve, reject) => {
            LabExam.find({ exameId: examObject.id }).populate('laboratorioId').exec((err, labExamsFound) => {
              if (err) {
                reject(err);
              } else {
                for(le of labExamsFound) {
                  examObject.laboratorios_associados.push(common.fixResponseData(le.laboratorioId[0]))
                }
                resolve(examObject);
              }
            });
          });
      });

      Promise.all(examElementsProms).then((resultArr) => {
        resolve(resultArr);
      });
    });

  }).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json(err);
  });


};