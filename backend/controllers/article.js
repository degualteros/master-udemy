'use strict'
var validator = require("validator");
var Article = require("../models/article");
var fs = require("fs");



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
    
    //Recoger parametros por post
    var params = req.body;
    console.log(params);
    // Validar datos con validator
    try{
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);

    }catch(err){
      return res.status(200).send({
        status: "error",
        message: "Datos errados"
      });
    }

    if (validate_title && validate_content) {
       console.log("Validacion correcta")
    //Crear objeto a Guardar
    var article =  new Article();

    //Asignar valores
    article.title = params.title;
    article.content = params.content;
    article.image = null;

    //Guardar el articulo
    article.save((err, articleStored) =>{
      if(err || !articleStored){
        return res.status(404).send({
          status: "error",
          message: "El articulo no se ha Guardado!!!"
        });
      }
    //Devolver respuesta
      return res.status(200).send({
        status: "sucess",
        article: articleStored
      }); 
    });
    }else{
      return res.status(200).send({
        message: "Los datos no son validos!!!"
      });
    }
  },

  getArticles: (req, res) => {
    //last
    var query = Article.find({});

    var last = req.params.last;
    console.log(last);

    if(last || last != undefined){
      query.limit(5);
    }
    
    //Find 
    query.sort("-_id").exec((err, articles) => {
      if(err){
        return res.status(500).send({
          status: "error",
          message: "Error al devolver los articulos"
        });
      }

      if(!articles){
        return res.status(200).send({
          status: "error",
          message: "No hay articulos a mostrar !!!"
        });
      }

      return res.status(200).send({
        status: "success",
        articles
      });
    })

  },

  getArticle: (req, res) =>{

    //regoger el id de la url
    var articleId =  req.params.id;
    //Comprobar que existe
    if(!articleId || articleId == null){
      return res.status(200).send({
        status: "error",
        message: "No existe el articulo"
      });
    }

    //Buscar el articulo
    Article.findById(articleId, (err, article) =>{

      if (err || !article) {
        return res.status(200).send({
          status: "error",
          message: "No existe el articulo"
        });
      }

    //Devolverlo en JSON
      return res.status(200).send({
        status: "success",
        article
      });

    });
  },

  update: (req, res) => {
    //Recoger id de articulo por la URL
    var articleId =  req.params.id;
    //Recoger datos que llegan por put
    var params =  req.body;

    //Validar datos
    try{
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    }catch(err){
      return res.status(200).send({
        status: "error",
        message: "Faltan datos por enviar !!!"
      });
    }

    if(validate_title && validate_content){
      //Find and update
      Article.findOneAndUpdate({_id: articleId}, params, {new: true}, (err, articleUpdated) =>{ 
        if(err){
          return res.status(500).send({
            status: "error",
            message: "Error al actualizar"
          });
        }

        if(!articleUpdated){
          return res.status(404).send({
            status: "error",
            message: "No existe el articulo !!!"
          });
        }

        return res.status(500).send({
          status: "sucess",
          article: articleUpdated
        });

      });
    }else{
      //Devolver respuesta
      return res.status(200).send({
        status: "error",
        message: "La validacion no es correcta"
      });
    }
  },

  delete: (req, res) => {
    //Recoger el ID de la URL
    var articleId = req.params.id;

    //Find and delete
    Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) =>{
      if(err){
        return res.status(500).send({
          status: "error",
          message: "Error al borrar !!!"
        });

      }

      if (!articleRemoved) {
        return res.status(404).send({
          status: "error",
          message: "No se ha borrado el articulo. Probablemente no existe !!!"
        });
      }

      return res.status(200).send({
        status: "sucess",
        article: articleRemoved
      });

    });
  }, //end delete

  upload: (req, res) => {
    // Configurar module connect multiparty router/article.js (hecho)

    //recoger fichero de la peticion
    var file_name = "Imagen no subida...";

    if (!req.files) {
      return res.status(200).send({
        status: "error",
        message: file_name
      });
      
    }
    //conseguir nombre y extension
    var file_path = req.files.file0.path;
    var file_split = file_path.split("\\");
    // ADVERTENCIA: Si es linux se debe hacer split con /
    
    //Nombre del archivo
    var file_name = file_split[2];

    //Extension del archivo
    var extension_split = file_name.split("\.");
    var file_ext = extension_split[1];
    
    //comprobar la extension (solo imagenes) sino es valida borrar
    if(file_ext != "png" && file_ext != "jpg" && file_ext != "jpeg" && file_ext != "gif"){
      
      // borrar el archivo subido (libreria filesistem FS y path)
      

    }else{
          //Si todo es valido

          //Buscar el articulo, nombrarlo y actualizarlo

    }


    return res.status(200).send({
      fichero: req.files,
      split: file_split,
      file_ext
    });
  }

}; //end controller

module.exports =  controller;