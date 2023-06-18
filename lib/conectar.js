const mongoose = require('mongoose');
var db=mongoose.connection;
db.on('error',function(err){
  console.log(err);
});
db.once('open',function(){
  console.info('Conectado a mongoDB.');
});
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost:27017/somosguaches", { useNewUrlParser: true,useUnifiedTopology: true });
