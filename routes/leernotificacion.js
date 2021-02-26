var express = require('express');
var router = express.Router();
const Notificacion = require('../models/Notificacion');
const jwt = require('jsonwebtoken');
const secret = require('./config.js');
/* GET home page. */
router.post('/', function(req, res, next) {
  var condicion={_id:req.body.id};
  var modificacion={leido:true};
  Notificacion.findOneAndUpdate(condicion,modificacion).populate('autor').populate('publicador').populate('publicacion').sort({fecha:'desc'}).exec(function(err,notificaciones){
    if (err) {
      return res.json({consultaError:'Error',message:'Ocurrio un error en la consulta con la base de datos'});
    }
    if (notificaciones) {
      return res.json({message:'Ok',notificaciones:notificaciones});
    }
  });
});

module.exports = router;
