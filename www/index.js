require('./util/extend');

var express = require('express')
  , http = require('http')
  , session = require('./util/session.js');

var app = express();
app.set('json spaces', null);

var logger = 'dev';

app.configure('staging', function(){
    logger = 'short';
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.cookieParser({secret: 'k_#9m4fciJx.s+mi9/2s5'}));
  app.use(express.logger(logger));
  app.use(express.bodyParser());
  app.use(session.middleware);
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


// Routers
require('./routes/user')(app);



var server = http.createServer(app);

server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});


