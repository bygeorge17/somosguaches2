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
  var form = new formidable.IncomingForm();
  var id =new  mongoose.Types.ObjectId();
  var campoFoto=id;
  var terminoconerror;
  var doc={};
  form.parse(req, function (err, fields, files) {
  });
  // console.log(form);
  // form.on('fileBegin', function (name, file){
  //   try {
  //
  //     let nombreArchivo=file.name;
  //     let dividido= nombreArchivo.split(".");
  //     file.path ='./public/images/beforecompression/' + id+"."+dividido[1];
  //     campoFoto+="."+dividido[1];
  //   } catch (e) {
  //     res.json({error:true,message:"Algo salio mal, por favor intente de nuevo"});
  //   } finally {
  //
  //   }
  // });
  // form.on('file', function (name, file){
  //   // (async () => {
  //   //   console.log("comprimiendo imagen");
  //   //   const files = await imagemin([file.path], {
  //   //     destination: './public/images/pubs/',
  //   //     plugins: [
  //   //       imageminMozjpeg({
  //   //         quality:20,
  //   //         progressive:true
  //   //       }),
  //   //       imageminPngquant({
  //   //         quality: [0.6, 0.8]
  //   //       })
  //   //     ]
  //   //   });
  //   //   fs.unlink(file.path, function(err) {
  //   //   });
  //   //   //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
  //   // })().then(function(){
  //   //
  //   // });
  // });
  var now = new Date();
  var idAutor="";
  var txtContenido="";
  form.on('field', function(name, value) {
    if (name=="txtPublicacion") {
      txtContenido=value;
    }
    if (name=="idUsuario") {
      idAutor=value;
    }
    if (name=="imgPublicacion") {
      var base64Data = value.replace(/^data:image\/png;base64,/, "");
      campoFoto=id+".png"
      fs.writeFile("./public/images/pubs/"+campoFoto, base64Data, "base64", function(err) {
        if (err) {
          terminoconerror=err;
        }
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
            terminoconerror=err;
          }
          if (resDoc) {
            doc=resDoc;
            terminoconerror=false;
          }
        });
        if (terminoconerror) {
          return res.json({message:'Ocurrio un error por favor intente de nuevo',error:terminoconerror});
        }
        return res.json({message:'publicacionGuardada',publicacion:doc});
      });
    }
  });
});

module.exports = router;
