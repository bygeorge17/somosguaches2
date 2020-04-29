const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');

const notificacionSchema=mongoose.Schema({
  autor : [{ type: mongoose.Schema.Types.ObjectId, ref: Usuario }],
  publicador : [{ type: mongoose.Schema.Types.ObjectId, ref: Usuario }],
  publicacion : [{ type: mongoose.Schema.Types.ObjectId, ref: Publicacion }],
  msg:String,
  leido:Boolean
});

module.exports=mongoose.model('Notification', notificacionSchema);
