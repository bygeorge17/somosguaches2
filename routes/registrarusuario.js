var express = require('express');
var router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const secret = require('./config');
/* GET users listing. */
router.post('/', function(req, res, next) {
  bcrypt.hash(req.body.contrasena,null,null, function(err,hash){
    if (err) {
      return res.json({message:'Algo ha salido mal',hashError:'error'});
    }

    Usuario.findOne({usuario:req.body.usuario}).exec(function(err,registro){
      if (err) {
        return res.json({message:'Ocurrio un erro por favor intente de nuevo'});
      }
      if (registro) {
        return res.json({message:'El correo electronico ya ha sido registrado'});
      }
      if (!registro) {
        var fechaNac=new Date(req.body.year+"-"+req.body.mes+"-"+req.body.dia);
        var now=new Date();
        var sexo="";
        if (req.body.sexo=="M") {
          sexo="mujer.png";
        }else{
          sexo="hombre.png";
        }
        var nuevoUsuario =Usuario({
          nombre : req.body.nombre,
          apellidos : req.body.apellidos,
          sexo : req.body.sexo,
          fechanac : fechaNac,
          fecharegistro : now,
          foto:sexo,
          municipio:req.body.municipio,
          estado:req.body.estado,
          radica:req.body.radica,
          usuario:req.body.usuario,
          contrasena:hash,
          status:0,
          admin:false
        });
        nuevoUsuario.save();
        const token=jwt.sign({id:nuevoUsuario._id},secret.secret,{
          expiresIn:60*60*24
        });
        res.json({auth:true, token })
      }
    });

  });
});

module.exports = router;
