var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
const formidable = require('formidable');
const mongoose = require('mongoose');
const imagemin=require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');
/* GET home page. */
router.post('/', function(req, res, next) {
  console.log("nuevopostconfoto");
  var form = new formidable.IncomingForm();
  var id =new  mongoose.Types.ObjectId();
  var campoFoto=id;
  var terminoconerror;
  var doc={};
  form.parse(req, function (err, fields, files) {
  });
  form.on('fileBegin', function (name, file){
    console.log("fileBegin"+file.name);
    let nombreArchivo=file.name;
    let dividido= nombreArchivo.split(".");
    file.path ='./public/images/beforecompression/' + id+"."+dividido[1];
    campoFoto+="."+dividido[1];
  });
  form.on('file', function (name, file){
    console.log("Campo Foto "+file.path);
    (async () => {
      console.log("comprimiendo imagen");
      const files = await imagemin([file.path], {
        destination: './public/images/pubs/',
        plugins: [
          imageminMozjpeg({
            quality:20,
            progressive:true
          }),
          imageminPngquant({
            quality: [0.6, 0.8]
          })
        ]
      });
      fs.unlink(file.path, function(err) {
      });
      //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
    })().then(function(){
      if (terminoconerror) {
        return res.json({message:'Ocurrio un error por favor intente de nuevo'});
      }
      return res.json({message:'publicacionGuardada',publicacion:doc});
    });
  });
  var now = new Date();
  var idAutor="";
  var txtContenido="";
  form.on('field', function(name, value) {
    console.log("name:"+name);
    if (name=="txtPublicacion") {
      console.log("El name es txtContenido");
      txtContenido=value;
      console.log(txtContenido);
    }
    if (name=="idUsuario") {
      idAutor=value;
      console.log(idAutor);
    }
  });
  form.on('end', function() {
    console.log("end");
    var nuevaPublicacion =new Publicacion({
      _id:id,
      contenido:txtContenido,
      fecha:now,
      foto:campoFoto,
      comentarios:[],
      autor:idAutor
    });
  nuevaPublicacion.save(function(err,resDoc){
    if (err) {
      terminoconerror=true;
    }
    if (resDoc) {
      doc=resDoc;
      terminoconerror=false;
    }
  });
  });

});

module.exports = router;
