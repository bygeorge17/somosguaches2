var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
/* GET home page. */
router.post('/', function(req, res, next) {
  condicion={_id:req.body.id_publicacion};
  var hearted=false;
  var idUsuario=req.body.idUsuario;
  Publicacion.findOne(condicion).exec(function(err,publicacionEncontrada){
    for (var i = 0; i < publicacionEncontrada.corazon.length; i++) {
      if (publicacionEncontrada.corazon[i].corazon==req.body.idUsuario) {
        hearted=true;
      }
    }
    if (hearted) {
      Actualizacion={$pull:{corazon:{corazon:idUsuario}}};
    }else{
      Actualizacion={$push:{corazon:{corazon:idUsuario}}};
    }
    Publicacion.findOneAndUpdate(condicion,Actualizacion,function(err,publicacionActualizada){
      if (err) {
        return res.json({consultaError:'Error',message:'Ocurrio un error en la consulta con la base de datos'});
      }
      if (publicacionActualizada) {
        return res.json({message:'Ok',publicaciones:publicacionActualizada});
      }
    });
  });
});

module.exports = router;
