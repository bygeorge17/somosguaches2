var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');
const Notificacion = require('../models/Notificacion');
/* GET home page. */
router.post('/', function(req, res, next) {

  console.log("Body Like"+req.body.id_publicacion);
  condicion={_id:req.body.id_publicacion};
  var liked=false;
  var idUsuario=req.body.idUsuario;
  Usuario.findOne({_id:idUsuario}).exec(function(err,autorNotificacion){
    console.log("autorNotificacion"+autorNotificacion._id);
    if (err) {
      return res.json({error:true,msg:"Algo salio mal intenta otra vez"})

    }
    console.log("autorNotificacion "+autorNotificacion);
    Publicacion.findOne(condicion).exec(function(err,publicacionEncontrada){
      for (var i = 0; i < publicacionEncontrada.likes.length; i++) {
        if (publicacionEncontrada.likes[i].likes==req.body.idUsuario) {
          liked=true;
        }
      }
      if (liked) {
        console.log("unlike autorNotificacion "+autorNotificacion);
        Actualizacion={$pull:{likes:{likes:idUsuario}}};
        res.io.emit("reaccion",{idAutor:autorNotificacion._id,autor:autorNotificacion.nombre,msg:"Le quito su like a tu publicacion",publicador:publicacionEncontrada.autor[0]});
      }else{
        console.log("Like autorNotificacion "+autorNotificacion);
        Actualizacion={$push:{likes:{likes:idUsuario}}};
        var notificacion=new Notificacion({
          autor:idUsuario,
          publicador:publicacionEncontrada.autor[0],
          publicacion:req.body.id_publicacion,
          leido:false
        });
        res.io.emit("reaccion",{idAutor:autorNotificacion._id,autor:autorNotificacion.nombre,msg:"Le dio like a tu publicacion",publicador:publicacionEncontrada.autor[0]});
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
});

module.exports = router;
