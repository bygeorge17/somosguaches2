const mongoose = require('mongoose');
const Usuario = require('./Usuario');

const personajeSchema=mongoose.Schema({
  nombre : String,
  apellidos : String,
  sexo : String,
  fechanac : String,
  fechadefuncion : String,
  foto:String,
  municipio:String,
  estado:String,
  comentarios:[{
    autor : { type: mongoose.Schema.Types.ObjectId, ref: Usuario },
    contenido:{type:String}
  }],
  autor : [{ type: mongoose.Schema.Types.ObjectId, ref: Usuario }],
  ocupacion:String,
  descripcion:String
});
module.exports=mongoose.model('personaje', personajeSchema);
