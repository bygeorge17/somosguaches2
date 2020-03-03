const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Historia = require('./Historia');
const Usuario = require('./Usuario');

const historiaSchema=mongoose.Schema({
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

module.exports=mongoose.model('historia', historiaSchema);
