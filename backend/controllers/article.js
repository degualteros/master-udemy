'use strict'
var validator = require("validator");
var Article = require("../models/article");


var controller = {  
  
  datosCurso: ("/prueba", (req, res) => {
  
    return res.status(200).send({
      curso: "Master en frameworks JS",
      autor: "David",
      url: "www.domiciliosorpresa.com"
    });
  
  }),

  test: (req, res) => {
    return res.status(200).send({
      message: "soy la accion del controlador de articulos"
    });
  },

  save: (req, res) => {
    
    //recoger parametros por POST
    var params = req.body;
    console.log(params);
        
    
    //validar datos (validator)

    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);

    } catch (err) {
      return res.status(200).send({
        error: "Datos invalidos o incompletos"
      });
    }

    if (validate_title && validate_content) {
      //crear objeto a guardar
      var article = new Article();
      //asignar valores 
      article.title = params.title;
      article.content = params.content;
      article.image = null;

      //guardar articulo
      article.save((err, articleStored) => {
        if (err || !articleStored) {
          return res.status(404).send({
            status: "error",
            message: "Articulo no guardado !!"
          });
        }

        

      });

      //devolver respuesta
      return res.status(200).send({
        status: "sucess",
        article

      });

    } else {
      return res.status(200).send({
        message: "los datos no son validos !!!"
      });
    }

  }

}; //end controller

module.exports =  controller;