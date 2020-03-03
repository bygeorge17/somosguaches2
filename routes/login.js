var express = require('express');
var router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const secret = require('./config');
/* GET home page. */
router.post('/', function(req, res, next) {
  Usuario.findOne({usuario:req.body.usuario}).exec(function(err, registro){
    if (err) {
    return  res.json({message:'Algo salio mal, por favor intente de nuevo'});
    }
    if (!registro) {
    return  res.json({message:'Usuario no identificado'});
    }
    if (registro) {
      bcrypt.compare(req.body.contrasena,registro.contrasena,function(err, check){
        if (err) {
        return  res.json({message:'Algo salio mal por favor intente de nuevo'})
        }
        if (!check) {
        return  res.json({message:'Datos incorrectos'});
        }
        if (check) {
          const token=jwt.sign({id:registro._id},secret.secret);
        return  res.json({auth:true,message:'OK',UsuarioIdentificado:registro,token});
        }
      });

    }
  });
});

router.get('/', function(req, res, next) {
  res.send('login de somosguaches');
});

module.exports = router;
