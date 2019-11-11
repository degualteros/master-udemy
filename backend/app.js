'use strict'

//cargar modulos de node para crear servidor//
var express = require("express");
var bodyparser = require("body-parser");

//ejecutar express (http)
var app = express();

//cargar ficheros rutas
var article_routes = require("./routes/article");

//Middlewares
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//CORS Peticiones desde frontend

//añadir prefijos a rutas / cargar rutas
app.use("/api", article_routes); 

//Añadir ruta o metodo de prueba
/*
app.get("/prueba", (req, res) => {
  
  return res.status(200).send({
    curso: "Master en frameworks JS",
    autor: "David",
    url: "www.domiciliosorpresa.com"
  })
});
*/
//exportar modulo (fichero actual)
module.exports = app;