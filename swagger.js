const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger-config.json'
const endpointsFiles = ['./config/routes.js']

const doc = {
  info: {
    version: "1.0.0",
    title: "LabExams API",
    description: "Documentação da applicação LabExams <b>By Juliano Cassoli</b> development."
  },
  host: "localhost:8081",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      "name": "Lab",
      "description": "Endpoints de acesso aos Laboratorios"
    },
    {
      "name": "Exames",
      "description": "Endpoints de acesso aos Exames"
    },
    {
      "name": "LabExams",
      "description": "Endpoints de acesso as associações entre Laboratorios e Exames"
    },
  ]
};

swaggerAutogen(outputFile, endpointsFiles, doc);
