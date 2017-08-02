//middleware
var express = require('express');

var bodyParser = require('body-parser');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var morgan = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');
var users = require('./users.js');
var routes = require('./routes.js');

var app = express();

// Socket set-up
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('looking for', function(friend) {
    console.log('friend', friend);
    io.emit('looking for', friend);
  });
});

//Middleware
app.use(passport.initialize());
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

// Express Validator (displays errors when logging in)
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'), root = namespace.shift(), formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use('/users', users);
app.use('/', routes);
app.use(express.static(__dirname + '/../react-client/dist'));

// app.listen(3000, function() {
//   console.log('listening on port 3000!');
// });

http.listen(3000, function(){
  console.log('socket listening on *:3000');
});