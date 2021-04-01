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
      "description": "Endpoints"
    },
    {
      "name": "Exames",
      "description": "Endpoints"
    },
    {
      "name": "LabExams",
      "description": "Endpoints"
    },
  ]
};

swaggerAutogen(outputFile, endpointsFiles, doc);
