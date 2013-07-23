require('./util/extend');

var express = require('express')
  , http = require('http')
  , session = require('./util/session.js');

var app = express();
app.set('json spaces', null);

var expressLog = 'dev';

app.configure('staging', function(){
    expressLog = 'short';
});

// Some necessary public vars
global.logger = require('./util/logger');
global.config = require('./util/config');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.cookieParser("F|i=Yp=se0]Hj';H=ja/JmOU-_bW|Ra%)+xi^Lx4Q`_Pbdpr"));
  app.use(express.logger(expressLog));
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
    logger.info("Express server listening on port " + app.get('port'));
});


