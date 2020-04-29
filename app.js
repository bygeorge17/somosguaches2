var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const appSocket = express();
const serverSocket = appSocket.listen(3001,console.log("Socket.io Hello Wolrd server started!"));

var io = require('socket.io')(serverSocket);            //http server passed to socket.io


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');
var registrarusuario = require('./routes/registrarusuario');
var getnotificaciones = require('./routes/getnotificaciones');
var leernotificacion = require('./routes/leernotificacion');
var getposts = require('./routes/getposts');
var getmensajes = require('./routes/getmensajes');
var getconversacion = require('./routes/getconversacion');
var sendmensaje = require('./routes/sendmensaje');
var getpostsperfil = require('./routes/getpostsperfil');
var getpost = require('./routes/getpost');
var deletepost = require('./routes/deletepost');
var getprofile = require('./routes/getprofile');
var getprofilevisited = require('./routes/getprofilevisited');
var nuevopost = require('./routes/nuevopost');
var nuevopostconfoto = require('./routes/nuevopostconfoto');
var agregarcomentario = require('./routes/agregarcomentario');
var like = require('./routes/like');
var dislike = require('./routes/dislike');
var estrella = require('./routes/estrella');
var molesto = require('./routes/molesto');
var corazon = require('./routes/corazon');
var addfotoperfil = require('./routes/addfotoperfil');

var app = express();
app.use(function(req, res, next){
res.io = io;
next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var corsOptions = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', login);
app.use('/registrarusuario', registrarusuario);
app.use('/getnotificaciones', getnotificaciones);
app.use('/leernotificacion', leernotificacion);
app.use('/getposts', getposts);
app.use('/getmensajes', getmensajes);
app.use('/getconversacion', getconversacion);
app.use('/sendmensaje', sendmensaje);
app.use('/getpostsperfil', getpostsperfil);
app.use('/getpost', getpost);
app.use('/deletepost', deletepost);
app.use('/getprofilevisited', getprofilevisited);
app.use('/getprofile', getprofile);
app.use('/nuevopost', nuevopost);
app.use('/nuevopostconfoto', nuevopostconfoto);
app.use('/agregarcomentario', agregarcomentario);
app.use('/like', like);
app.use('/dislike', dislike);
app.use('/estrella', estrella);
app.use('/corazon', corazon);
app.use('/molesto', molesto);
app.use('/addfotoperfil', addfotoperfil);

app.get('/autentificar',function(req,res,next){
  console.log("Autentificando");
  const token=req.headers['x-acces-token'];
  if (token) {
    return res.json({respuesta:'ok'});
  }else{
    return res.json({respuesta:'notoken'});
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
require('./lib/conectar');

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
