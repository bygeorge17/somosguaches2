var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');
const Notificacion = require('../models/Notificacion');
/* GET home page. */
router.post('/', function(req, res, next) {
  condicion={_id:req.body.id_publicacion};
  var disliked=false;
  var idUsuario=req.body.idUsuario;
  Usuario.findOne({_id:idUsuario}).exec(function(err,autorNotificacion){
    if (err) {
      return res.json({error:true,msg:"Algo salio mal intenta otra vez"})

    }
    Publicacion.findOne(condicion).exec(function(err,publicacionEncontrada){
      for (var i = 0; i < publicacionEncontrada.dislikes.length; i++) {
        if (publicacionEncontrada.dislikes[i].dislikes==req.body.idUsuario) {
          disliked=true;
        }
      }
      if (disliked) {
        res.io.emit("reaccion",{idAutor:autorNotificacion._id,autor:autorNotificacion.nombre,msg:"Le quito su dislike a tu publicacion",publicador:publicacionEncontrada.autor[0]});

        Actualizacion={$pull:{dislikes:{dislikes:idUsuario}}};
      }else{
        res.io.emit("reaccion",{idAutor:autorNotificacion._id,autor:autorNotificacion.nombre,msg:"Le dio dislike a tu publicacion",publicador:publicacionEncontrada.autor[0]});
        var notificacion=new Notificacion({
          autor:idUsuario,
          publicador:publicacionEncontrada.autor[0],
          publicacion:req.body.id_publicacion,
          leido:false
        });
        Actualizacion={$push:{dislikes:{dislikes:idUsuario}}};
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
});

module.exports = router;
