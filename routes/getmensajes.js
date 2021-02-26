var express = require('express');
var router = express.Router();
const Usuario = require('../models/Usuario');
const Mensajes = require('../models/Mensajes');
const jwt = require('jsonwebtoken');
const secret = require('./config.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  const token=req.headers['x-access-token'];
  if (!token || token==undefined) {
    return res.json({message:"Token Error"});
  }
  var tokenValido=jwt.verify(token, secret.secret);
  var id=tokenValido.id;

  Mensajes.find({$or:[{para:id},{de:id}]}).populate('de').populate('para').exec(function(err,mensajes){
    if (err) {
      return res.json({err:err});
    }
    if (mensajes) {
      return res.json({ok:true,mensajes:mensajes});
    }
  });
});

module.exports = router;
