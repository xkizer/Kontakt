var session = require('../controllers/session.js'),
    User = require('../models/User.js'),
    error = require('../util/error.js'),
    request, response;

/**
 * Save the current session to the database: a helper function
 * This function is called at the end of every request
 */
function saveSession() {
    var req = this;

    if(req.session) {
        // Check necessary to ensure that session had not been ended
        var sessInfo = req.session;

        if(!sessInfo) {
            return;
        }
        
        delete sessInfo.user;
        session.updateSession (req.sessionId, sessInfo, function () {/* Nothing */});
    }
}

/**
 * Check if someone is logged in. Currently examines the session to know if it will find a userId
 * @return bool
 */
function isLoggedIn () {
    var req = this;
    return Boolean(req.session && req.session.user);
}

/**
 * Get the user that is currently logged in. If no user is logged in, returns nothing
 * @return User Returns the logged in user, if logged in
 */
function getUser() {
    var req = this;
    
    if(!req.isLoggedIn()) {
        // Not logged in...
        return null;
    }
    
    return req.session.user;
}

/**
 * End the current session
 * @param {function} callback
 */
function endSession(callback) {
    var req = this;

    if(!req.sessionId) {
        // Not really on any session
        return callback(null);
    }

    session.endSession(req.sessionId, callback);
}

/**
 * Check if a user is logged in. If the user is not logged in, redirect to the
 * login page. If error occurs, redirect to a 500 page. If the user is logged in
 * process the callback function.
 * @param {Function} callback Callback receives the User object of the logged in
 *  user.
 * @returns {undefined}
 */
function requireLogin(callback) {
    var req = this;

    var user = this.getUser();

    if(!user) {
        return response.json(error(0x1220)).end();
    }
    
    // User found
    return callback(user);
}

module.exports = {
    middleware: function (req, res, next) {
        req.isLoggedIn = isLoggedIn;
        req.getUser = getUser;
        req.logout  = req.endSession = endSession;
        req.requireLogin = requireLogin;
        response = res;
        request = req;
        
        var sessionId = (req.query && req.query.authToken) || (req.cookies && req.cookies.sid);
        console.log(sessionId);
        
        if(!sessionId) {
            // No session tokens
            return next();
        }
        
        session.getSession(sessionId,
            {
                ip: req.socket.remoteAddress,
                renew: true,
                userAgent: req.headers['user-agent']
            },
            function (err, session) {
                if(err) {
                    // No session or session error
                    // Ignore for now
                    // TODO: examine the error and decide whether to ignore or throw an HTTP 500
                    return next();
                }

                // Session found...
                var user = new User.User(session.userId);
                
                user.on('error', function (err) {
                    // Bad error
                    req.json(error(0x1240)).end();
                });
                
                user.on('ready', function () {
                    req.session = session;
                    req.sessionId = sessionId;
                    req.session.user = user;
                    res.on("finish", saveSession.callback(req));
                    next();
                });
            }
        );
    }
};



