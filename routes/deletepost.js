var express = require('express');
var router = express.Router();
const Publicacion = require('../models/Publicacion');
/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  Publicacion.findOneAndDelete({_id:req.body.pubId}).exec(function(err,publicaciones){
    if (err) {
      return res.json({consultaError:'Error',message:'Ocurrio un error en la consulta con la base de datos'});
    }
    if (publicaciones) {
      return res.json({message:'Ok',publicacion:publicaciones});
    }
  });
});
module.exports = router;
