var express = require('express');
var router = express.Router();
const formidable = require('formidable');
var mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const imagemin=require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');
/* GET home page. */
router.post('/', function(req, res, next) {
  var form = new formidable.IncomingForm();
  var id =new  mongoose.Types.ObjectId();
  var campoFoto=id;
  var fotografia="";
  var idAutor="";
  form.parse(req, function (err, fields, files) {
  });
  form.on('error', function(error) { // I thought this would handle the upload error
    return res.json({error:true,message:"Ocurrio un error por favor intenta de nuevo"});
  })
  form.on('fileBegin', function (name, file, err){
    let nombreArchivo=file.name;
    let dividido= nombreArchivo.split(".");

    file.path ='./public/images/beforecompression/' + id+"."+dividido[1];
    campoFoto+="."+dividido[1];

  });

  form.on('file', function (name, file){

  });
  var mensaje,ocurrioerror;
  form.on('field', function(name, value) {
    if (name=="idUsuario") {
      idAutor=value;
    }
    if (name=="foto-perfil") {
      var base64Data = value.replace(/^data:image\/jpeg;base64,/, "");
      campoFoto=id+".jpeg"
      fs.writeFile("./public/images/usuarios/"+campoFoto, base64Data, "base64", function(err) {
        if (err) {
          terminoconerror=err;
        }
        condicion={_id:idAutor};
        Actualizacion={foto:campoFoto};
        Usuario.findOneAndUpdate(condicion,Actualizacion, function(err,res){
          if (err) throw err;
          if (!res) {
            mensaje="Intene de nuevo";
            ocurrioerror=true;
          }
          if (res) {
            mensaje="Foto actualizada";
            ocurrioerror=false;
          }
      });
      return res.json({message:mensaje,ocurrioerror:ocurrioerror});
      });
    }
  });

});

module.exports = router;
