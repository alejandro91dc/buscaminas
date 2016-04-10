//variables de express y de rutas 
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
//configuracion para socket.io
var port = process.env.PORT || 3000;
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(port);
/// lineas CORS-HEADERS
app.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "X-Requested-with");
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));
app.use('/', routes);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Configuracion socket.io para el inicio de conexion e intercambio
//de eventos
player = 0;
io.sockets.on('connection', function(socket){
  socket.id = player;
  player +=1;
  console.log("Un usuario salvaje aparecio: usuario "+ player);
  socket.emit('vista', player);
  aleatorio = Math.floor((Math.random()* 49)+1);
  socket.broadcast.emit('bomba', aleatorio);
  socket.on('click', function(seccion){
    console.log ("el usuario "+player+" ha clicado")
    /*if (socket.id == 0)
      io.sockets.emit('accion', seccion);
    else if (socket.id == 1) 
      io.sockets.emit('accion2', seccion);
    else
      io.sockets.emit('accion3', seccion);*/
    switch (socket.id) {
      case 0: io.sockets.emit('azul', seccion);
      break;
      case 1: io.sockets.emit('rosa', seccion);
      break;
      case 2: io.sockets.emit('violeta', seccion);
      break;
      case 3: io.sockets.emit('amarillo', seccion);
      break;
      case 4: io.sockets.emit('verde', seccion);
      break;
      case 5: io.sockets.emit('rojo', seccion);
      break;
    }
   });
     
  socket.on('disconnect', function(){
    console.log("El usuario "+player+" se ha desconectado");
  }); 
});

module.exports = io;
module.exports = app;
