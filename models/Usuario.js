const mongoose = require('mongoose');
const usuarioSchema=mongoose.Schema({
  nombre : String,
  apellidos : String,
  sexo : String,
  fechanac : Date,
  fecharegistro : Date,
  foto:String,
  municipio:String,
  estado:String,
  radica:String,
  codigoverificacion:String,
  usuario:String,
  contrasena:String,
  status:Number,
  admin:Boolean
});
module.exports=mongoose.model('usuario', usuarioSchema);
