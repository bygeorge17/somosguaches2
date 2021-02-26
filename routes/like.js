var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');
const Notificacion = require('../models/Notificacion');
/* GET home page. */
router.post('/', function(req, res, next) {

  condicion={_id:req.body.id_publicacion};
  var liked=false;
  var idUsuario=req.body.idUsuario;
  Usuario.findOne({_id:idUsuario}).exec(function(err,autorNotificacion){
    if (err) {
      return res.json({error:true,msg:"Algo salio mal intenta otra vez"})

    }
    Publicacion.findOne(condicion).exec(function(err,publicacionEncontrada){
      for (var i = 0; i < publicacionEncontrada.likes.length; i++) {
        if (publicacionEncontrada.likes[i].likes==req.body.idUsuario) {
          liked=true;
        }
      }
      if (liked) {
        Actualizacion={$pull:{likes:{likes:idUsuario}}};
        res.io.emit("reaccion",{idAutor:autorNotificacion._id,autor:autorNotificacion.nombre,msg:"Le quito su like a tu publicacion",publicador:publicacionEncontrada.autor[0]});
      }else{
        Actualizacion={$push:{likes:{likes:idUsuario}}};
        var notificacion=new Notificacion({
          autor:idUsuario,
          publicador:publicacionEncontrada.autor[0],
          publicacion:req.body.id_publicacion,
          msg:"Le dio like a tu publicacion",
          leido:false
        });
        notificacion.save(function(err,res){
          if (err) {
          return  res.json({error:true,message:"Algo salio mal, por favor intente de nuevo"});

          }
        });
        res.io.emit("reaccion",{idAutor:autorNotificacion._id,autor:autorNotificacion.nombre,msg:"Le dio like a tu publicacion",publicador:publicacionEncontrada.autor[0]});
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
