const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Usuario = require('./Usuario');

const publicacionSchema=mongoose.Schema({
  contenido : String,
  fecha : Date,
  foto : String,
  comentarios:[{
    autor : { type: mongoose.Schema.Types.ObjectId, ref: Usuario },
    contenido:{type:String}
  }],
  autor : [{ type: mongoose.Schema.Types.ObjectId, ref: Usuario }],
  nombreautor:String,
  fotoautor:String,
  likes:Array,
  dislikes:Array,
  estrella:Array,
  corazon:Array,
  molesto:Array
});

module.exports=mongoose.model('Publicacione', publicacionSchema);
