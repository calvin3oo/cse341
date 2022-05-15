const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'calvin3oo-cse-341.herokuapp.com',
  schemes: ['https'],
  definitions: {
    addUser:{
      $firstName: "name",
      $lastName: "last",
      $email: "email",
      $favoriteColor: "color",
      $birthday: "birthday"
    },
    updateUser:{
      firstName: "name",
      lastName: "last",
      email: "email",
      favoriteColor: "color",
      birthday: "birthday"
    }
  }
};


const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc)/*.then(() => {
    require('./server.js'); // Your project's root file
});*/