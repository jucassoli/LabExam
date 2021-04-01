const labController = require('../controllers/laboratorioController');
const examController = require('../controllers/exameController');
const labExamController = require('../controllers/labExamsController');

exports.routesConfig = function (app) {

  app.get('/', (req, res) => {
    // #swagger.ignore = true
    res.redirect('/api-docs');
  });

  app.get('/lab', labController.getAllLabs);
  app.get('/lab/:id', labController.findById);
  app.post('/lab', labController.createLab);
  app.put('/lab/:id', labController.updateLab);
  app.delete('/lab/:id', labController.deleteLab);

  app.get('/exame', examController.getAllExams);
  app.get('/exame/:id', examController.findById);
  app.post('/exame', examController.createExam);
  app.put('/exame/:id', examController.updateExam);
  app.delete('/exame/:id', examController.deleteExam);

  app.post('/associar', labExamController.associate);
  app.post('/examesLabs', labExamController.findExamsByNome);

}