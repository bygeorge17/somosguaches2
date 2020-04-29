var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');

/* GET home page. */
router.get('/', function(req, res, next) {
  var usuarios;
  Usuario.count({}, function(err, count) {
    usuarios=count;
    res.render('index', { title: 'Somos Guaches La red social de Tierra Caliente',usuarios:usuarios });
});

});

module.exports = router;
