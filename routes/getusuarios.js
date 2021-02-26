var express = require('express');
var router = express.Router();
const Usuario = require('../models/Usuario');
/* GET home page. */
router.get('/', function(req, res, next) {
  Usuario.find().exec(function(err,usuarios){
    if (err) {
      return res.json({consultaError:'Error',message:'Ocurrio un error en la consulta con la base de datos'});
    }
    if (publicaciones) {
      return res.json({message:'Ok',usuarios});
    }
  });
});

module.exports = router;
