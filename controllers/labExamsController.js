const LabExam = require("../models/labExam");
const common = require("../common/common");

exports.associate = (req, res) => {
  let data = req.body;

  if (Array.isArray(data)) {
    let aditionsArray = [];
    for (let item of data) {
      aditionsArray.push(createSingle(item, Exame));
    }
    Promise.all(aditionsArray).then(result => {
      res.status(201).json({ "created": result });
    }).catch(err => {
      res.status(500).send(err);
    });

  } else {
    createSingle(data, Exame).then(result => {
      res.status(201).json({ "created": result });
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
        resolve({ isSuccess: true, exame: newLabExam });
      }
    });
  });
};

