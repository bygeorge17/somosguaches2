var express = require('express');
var router = express.Router();
const Usuario = require('../models/Usuario');
const Mensajes = require('../models/Mensajes');
const jwt = require('jsonwebtoken');
const secret = require('./config.js');
/* GET home page. */
router.post('/', function(req, res, next) {
  Mensajes.find({$or:[{para:req.body.destinatario,de:req.body.remitente},{de:req.body.destinatario,para:req.body.remitente}]}).populate('de').populate('para').exec(function(err,conversacion){
    if (err) {
      return res.json({err:err});
    }
    if (conversacion) {
      return res.json({ok:true,conversacion:conversacion});
    }
  });
});

module.exports = router;
