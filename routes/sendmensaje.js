var express = require('express');
var router = express.Router();
const Usuario = require('../models/Usuario');
const Mensajes = require('../models/Mensajes');
const jwt = require('jsonwebtoken');
const secret = require('./config.js');
/* GET home page. */
router.post('/', function(req, res, next) {
  var now = new Date();

  var mensaje= Mensajes({
    de:req.body.remitente,
    para:req.body.destinatario,
    fecha:now,
    msg:req.body.msg,
    leido:false
  });
  mensaje.save(function(err,msg){
    if (err) {
      return res.json({message:'Ocurrio un error por favor intente de nuevo'});
    }
    if (msg) {
      res.io.emit("nuevoMensaje",{de:req.body.remitente,para:req.body.destinatario});
      return res.json({message:'Mensaje Guardado',mensaje:msg,err:false});
    }
  });
});

module.exports = router;
