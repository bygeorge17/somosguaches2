var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
/* GET home page. */
router.post('/', function(req, res, next) {
  condicion={_id:req.body.id_publicacion};
  var molestado=false;
  var idUsuario=req.body.idUsuario;
  Publicacion.findOne(condicion).exec(function(err,publicacionEncontrada){
    for (var i = 0; i < publicacionEncontrada.molesto.length; i++) {
      if (publicacionEncontrada.molesto[i].molesto==req.body.idUsuario) {
        molestado=true;
      }
    }
    if (molestado) {
      Actualizacion={$pull:{molesto:{molesto:idUsuario}}};
    }else{
      Actualizacion={$push:{molesto:{molesto:idUsuario}}};
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
