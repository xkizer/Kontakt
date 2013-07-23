/**
 * The logger is used for logging messages to the console, and for logging
 * application events.
 */

var db = require('./db');
var queue = [];
var cli = require('cli-color');

var collection = {
    insert: function (item) {
        queue.push(item);
    }
};

db.mongoConnect({db: 'kontakt', collection: 'logs'}, function (err, coll) {
    if(err) {
        console.log(err);
        throw new Error("Can't initialize logger due to error");
    }
    
    collection = coll;
    
    queue.forEach(function (item) {
        coll.insert(item, function (err) {
            // /dev/null
        });
    });
});

module.exports = {
    warn: function () {
        if(config.logLevel <= 3) {
            var prefix = cli.bgYellow('WARNING') + cli.white(' -');
            [].unshift.call(arguments, prefix);
            console.log.apply(console, arguments);
        }
    },
    
    error: function () {
        if(config.logLevel <= 4) {
            var prefix = cli.bgRed('ERROR') + cli.white(' -');
            [].unshift.call(arguments, prefix);
            console.log.apply(console, arguments);
        }
    },
    
    debug: function () {
        if(config.logLevel <= 1) {
            var prefix = cli.bgBlue('DEBUG') + cli.white(' -');
            [].unshift.call(arguments, prefix);
            console.log.apply(console, arguments);
        }
    },
    
    info: function () {
        if(config.logLevel <= 2) {
            var prefix = cli.bgGreen('INFO') + cli.white(' -');
            [].unshift.call(arguments, prefix);
            console.log.apply(console, arguments);
        }
    },
    
    critical: function () {
        if(config.logLevel <= 3) {
            var prefix = cli.bgRed(cli.yellow('CRITICAL!!!')) + cli.white(' -');
            [].unshift.call(arguments, prefix);
            console.log.apply(console, arguments);
        }
    },
    
    log: function (type, message, failed, info) {
        // Log is the main logger that is used by the application to log major
        // events, including all transactions. This is logged to a DB.
        // There are types of logs, which identify logs of the same family.
        var log = {
            type: String(type),
            message: message,
            failed: failed,
            date: new Date,
            data: info
        };
    }
};