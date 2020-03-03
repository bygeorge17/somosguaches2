var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
/* GET home page. */
router.post('/', function(req, res, next) {
  console.log("Body Like"+req.body.id_publicacion);
  condicion={_id:req.body.id_publicacion};
  var disliked=false;
  var idUsuario=req.body.idUsuario;
  Publicacion.findOne(condicion).exec(function(err,publicacionEncontrada){
    for (var i = 0; i < publicacionEncontrada.dislikes.length; i++) {
      if (publicacionEncontrada.dislikes[i].dislikes==req.body.idUsuario) {
        disliked=true;
      }
    }
    if (disliked) {
      Actualizacion={$pull:{dislikes:{dislikes:idUsuario}}};
    }else{
      Actualizacion={$push:{dislikes:{dislikes:idUsuario}}};
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
