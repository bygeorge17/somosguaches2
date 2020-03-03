var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
/* GET home page. */
router.post('/', function(req, res, next) {
  console.log("Body Like"+req.body.id_publicacion);
  condicion={_id:req.body.id_publicacion};
  var liked=false;
  var idUsuario=req.body.idUsuario;
  Publicacion.findOne(condicion).exec(function(err,publicacionEncontrada){
    for (var i = 0; i < publicacionEncontrada.likes.length; i++) {
      if (publicacionEncontrada.likes[i].likes==req.body.idUsuario) {
        liked=true;
      }
    }
    if (liked) {
      Actualizacion={$pull:{likes:{likes:idUsuario}}};
    }else{
      Actualizacion={$push:{likes:{likes:idUsuario}}};
    }
    Publicacion.findOneAndUpdate(condicion,Actualizacion,function(err,publicacionActualizada){
      if (err) {
        return res.json({consultaError:'Error',message:'Ocurrio un error en la consulta con la base de datos'});
      }
      if (publicacionActualizada) {
        console.log(publicacionActualizada);
        return res.json({message:'Ok',publicaciones:publicacionActualizada});
      }
    });
  });
});

module.exports = router;
