var users = require('../models/User'),
    User = users.User,
    session = require('../controllers/session'),
    error = require('../util/error.js');

module.exports = {
    register: function (req, res, next) {
        var data = req.body;
        users.createUser(data, function (err, user) {
            if(err) {
                return res.json(err);
            }
            
            res.json({ok: 1, userId: user.get('id')});
        });
    },
    
    login: function (req, res, next) {
        var username = req.body.username,
            password = req.body.password;
        
        var user = new User(username);
        
        user.on('error', function (err) {
            res.json(err).end();
        });
        
        user.on('ready', function () {
            var login = this.validatePassword(password);
            
            if(!login) {
                return res.json(error(0x1550));
            }
            
            // Create the session
            session.createSession({
                userId: user.get('id')
            }, {
                ip: req.socket.remoteAddress,
                renew: true,
                userAgent: req.headers['user-agent']
            }, function (err, sessionId) {
                if(err) {
                    return res.json(error(0x1550));
                }
                
                res.json({ok: 1, token: sessionId});
            });
        });
    },
    
    changePassword: function (req, res, next) {
        if(req.body.resetKey) {
            // This is a password reset, not change
            return next();
        }
        
        var newPass = req.body.password;
        var oldPass = req.body.oldpassword;
        
        req.requireLogin(function (user) {
            user.changePassword(oldPass, newPass, function (err) {
                if(err) {
                    return res.json(err);
                }
                
                res.json({ok: 1});
            });
        });
    },
    
    editUser: function (req, res, next) {
        req.requireLogin(function (user) {
            user.set(req.body, function (err) {
                if(err) {
                    return res.json(err);
                }
                
                res.json({ok: 1});
            });
        });
    },
    
    deleteAccount: function (req, res, next) {
        
    },
    
    getInfo: function (req, res, next) {
        req.requireLogin(function (user) {
            user.get(req.body, function (err) {
                if(err) {
                    return res.json(err);
                }
                
                res.json({ok: 1});
            });
        });
    }
};











