const mongoose = require('mongoose');
var db=mongoose.connection;
db.on('error',function(err){
  console.log(err);
});
db.once('open',function(){
  console.info('Conectado a mongoDB.');
});
// mongoose.connect("mongodb://bygeorge:H6VfUtOlNmfxeo9N@somosguaches-shard-00-00-54xp0.mongodb.net:27017,somosguaches-shard-00-01-54xp0.mongodb.net:27017,somosguaches-shard-00-02-54xp0.mongodb.net:27017/test?ssl=true&replicaSet=somosguaches-shard-0&authSource=admin");
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost:27017/somosguaches", { useNewUrlParser: true,useUnifiedTopology: true });
