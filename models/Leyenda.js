const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Leyenda = require('./Leyenda');
const Usuario = require('./Usuario');

const leyendaSchema=mongoose.Schema({
  titulo:String,
  descripcion : String,
  fecha : String,
  foto : String,
  comentarios:[{
    autor : { type: mongoose.Schema.Types.ObjectId, ref: Usuario },
    contenido:{type:String}
  }],
  autor : [{ type: mongoose.Schema.Types.ObjectId, ref: Usuario }],
  lugar:String
});

module.exports=mongoose.model('leyenda', leyendaSchema);
