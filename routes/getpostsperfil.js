var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  console.log("Token en publicaciones"+req.headers['x-access-token']);
  const populateLog = {path: 'comentarios.autor'};
  Publicacion.find({autor:req.body.idPerfilVisitado}).populate('autor').populate(populateLog).sort({fecha:'desc'}).exec(function(err,publicaciones){
    if (err) {
      return res.json({consultaError:'Error',message:'Ocurrio un error en la consulta con la base de datos'});
    }
    if (publicaciones) {
      return res.json({message:'Ok',publicaciones:publicaciones});
    }
  });
});

module.exports = router;
