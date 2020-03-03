var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  condicion={_id:req.body.id_publicacion};
      Actualizacion={$push:{comentarios:{contenido:req.body.txtComentario,autor:req.body.idUser}}};
  Publicacion.findOneAndUpdate(condicion,Actualizacion,function(err,publicacionActualizada){
    if (err) {
      return res.json({consultaError:'Error',message:'Ocurrio un error en la consulta con la base de datos'});
    }
    if (publicacionActualizada) {
      return res.json({message:'Ok',publicaciones:publicacionActualizada});
    }
    if (!publicacionActualizada) {
      return res.json({message:'Error al Actualizar publicacion'});
    }
  });
});

module.exports = router;
