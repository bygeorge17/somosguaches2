var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
/* GET home page. */
router.get('/', function(req, res, next) {
  const populateLog = {path: 'comentarios.autor'};
  Publicacion.find({_id:req.query.id}).populate('autor').populate(populateLog).sort({fecha:'desc'}).exec(function(err,publicaciones){
    if (err) {
      return res.json({consultaError:'Error',message:'Ocurrio un error en la consulta con la base de datos'});
    }
    if (publicaciones) {
      return res.json({message:'Ok',publicacion:publicaciones});
    }
  });
});

router.post('/', function(req, res, next) {
  const populateLog = {path: 'comentarios.autor'};
  Publicacion.find({_id:req.body.id}).populate('autor').populate(populateLog).sort({fecha:'desc'}).exec(function(err,publicaciones){
    if (err) {
      return res.json({consultaError:'Error',message:'Ocurrio un error en la consulta con la base de datos'});
    }
    if (publicaciones) {
      return res.json({message:'Ok',publicacion:publicaciones});
    }
  });
});

module.exports = router;
