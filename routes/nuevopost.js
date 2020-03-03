var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
const mongoose = require('mongoose');
/* GET home page. */
router.post('/', function(req, res, next) {
  console.log("nuevopost");
  if (req.body.txtContenido=='') {
    console.log("no hay publicacion");
    return res.json({message:'no hay informacion que publicar',OK:false});
  }
  var id =new  mongoose.Types.ObjectId();
  var now = new Date();
    var nuevaPublicacion =Publicacion({
      _id:id,
      contenido:req.body.txtContenido,
      fecha:now,
      comentarios:[],
      autor:req.body.idUsuario,
    });
    nuevaPublicacion.save(function(err,doc){
      if (err) {
        return res.json({message:'Ocurrio un error por favor intente de nuevo'});
      }
      if (doc) {
        console.log(doc);
        return res.json({message:'publicacionGuardada',publicacion:doc});
      }
    });
  });

module.exports = router;
