var express = require('express');
var router = express.Router();
const Notificacion = require('../models/Notificacion');
const jwt = require('jsonwebtoken');
const secret = require('./config.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  const token=req.headers['x-access-token'];
  if (!token || token==undefined) {
    return res.json({message:"Token Error"});
  }
  var tokenValido=jwt.verify(token, secret.secret);
  Notificacion.find({publicador:tokenValido.id,leido:false}).populate('autor').populate('publicador').populate('publicacion').sort({fecha:'desc'}).exec(function(err,notificaciones){
    if (err) {
      return res.json({consultaError:'Error',message:'Ocurrio un error en la consulta con la base de datos'});
    }
    if (notificaciones) {
      return res.json({message:'Ok',notificaciones:notificaciones});
    }
  });
});

module.exports = router;
