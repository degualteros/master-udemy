'use strict'

var mongoose = require('mongoose');
var app = require("./app");
var port = 3900;

var url = 'mongodb://localhost:27017/api_rest_blog';

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
  console.log("La conexion a la DB se ha realizado ok");

  //Crear servidor y poner a escuchar peticiones http
  app.listen(port, () => {
    console.log("Servidor corriendo en http://localhost:" + port);    
  });

});