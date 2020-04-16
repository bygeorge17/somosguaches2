var express = require('express');
var router = express.Router();
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const secret = require('./config.js');
/* GET home page. */
router.get('/', function(req, res, next) {

  const token=req.headers['x-access-token'];
  if (!token || token==undefined) {
    return res.json({message:"Token Error"});
  }
  var tokenValido=jwt.verify(token, secret.secret);
  Usuario.findById(tokenValido.id,{contrasena:0}).exec(function(err,perfilEncontrado){
    if (err) {
      return res.json({consultaError:'Error',message:'Ocurrio un error en la consulta con la base de datos'});
    }
    if (perfilEncontrado) {
      return res.json({message:'Ok',perfil:perfilEncontrado});
    }
  });
});

module.exports = router;
