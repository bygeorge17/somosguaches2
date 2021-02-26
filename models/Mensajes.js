const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Usuario = require('./Usuario');

const mensajeSchema=mongoose.Schema({
  de : { type: mongoose.Schema.Types.ObjectId, ref: Usuario },
  para : { type: mongoose.Schema.Types.ObjectId, ref: Usuario },
  fecha:Date,
  msg:String,
  leido:Boolean
});

module.exports=mongoose.model('Mensaje', mensajeSchema);
