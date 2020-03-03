const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comunidad = require('./Comunidad');
const Usuario = require('./Usuario');

const comunidadSchema=mongoose.Schema({
  nombre:String,
  estado:String,
  municipio:String,
  descripcion : String,
  fundacion : String,
  foto : String,
  escudo:String,
  comentarios:[{
    autor : { type: mongoose.Schema.Types.ObjectId, ref: Usuario },
    contenido:{type:String}
  }],
  autor : [{ type: mongoose.Schema.Types.ObjectId, ref: Usuario }],
  superficie:String,
  gentilicio:String,
  clima:String,
  historia:String,
  poblacion:Number,
  artesania:String,
  gastronomia:String,
  tradiciones:String,
  flora:String,
  fauna:String
});

module.exports=mongoose.model('comunidad', comunidadSchema);
