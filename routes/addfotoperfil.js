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
    console.log("Contenido del formulario:"+form);
  });
  form.on('error', function(error) { // I thought this would handle the upload error
    return res.json({error:true,message:"Ocurrio un error por favor intenta de nuevo"});
  })
  form.on('fileBegin', function (name, file, err){
    let nombreArchivo=file.name;
    let dividido= nombreArchivo.split(".");

    file.path ='./public/images/beforecompression/' + id+"."+dividido[1];
    console.log("fileBegin file.path"+file.path);
    campoFoto+="."+dividido[1];

  });

  form.on('file', function (name, file){
    // (async () => {
    //   console.log("comprimiendo imagen");
    //   const files = await imagemin([file.path], {
    //     destination: './public/images/usuarios/',
    //     plugins: [
    //       imageminMozjpeg({
    //         quality:20,
    //         progressive:true
    //       }),
    //       imageminPngquant({
    //         quality: [0.6, 0.8]
    //       })
    //     ]
    //   });
    //   fs.unlink(file.path, function(err) {
    //   });
    //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
    // })().then(function(){
    // });

  });
  var mensaje,ocurrioerror;
  form.on('field', function(name, value) {
    console.log("field"+value);
    if (name=="idUsuario") {
      idAutor=value;
    }
    if (name=="foto-perfil") {
      var base64Data = value.replace(/^data:image\/png;base64,/, "");
      campoFoto=id+".png"
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
        console.log(res);
      });
    }
  });

});

module.exports = router;
