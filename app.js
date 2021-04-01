const express = require('express');
const routes = require("./config/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-config.json");

const PORT = 8081;
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  //res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  } else {
      return next();
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes.routesConfig(app);

app.listen(PORT, function () {
  console.log('LabExams listening at port %s', PORT);
});
