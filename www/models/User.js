var db = require('../util/db'),
    events = require('events'),
    error = require('../util/error'),
    util = require('../util/util'),
    cli = require('cli-color');


module.exports = {
    User: User,
    createUser: createUser,
    deleteUser: deleteUser
};

/**
 * Initialize a new User
 * @param {number} userId The userId of the user. Will fail if user does not exist.
 */
function User (userId) {
    var me = this;
    me.extend(events.EventEmitter.prototype);
    
    // Look for the user in the database
    db.mongoConnect({db: 'kontakt', collection: 'users'}, function (err, users, db) {
        if(err) {
            return me.emit(error(0x1210, err));
        }
        
        var qry = {
                    $or: [
                        {userId: Number(userId)},
                        {email: String(userId)},
                        {username: String(userId)}
                    ],
                    status: 'active'
                };
        
        users.findOne(qry, function (err, user) {
            if(err) {
                return me.emit('error', error(0x1210, err));
            }
            
            if(!user) {
                return me.emit('error', error(0x1510, err));
            }
            
            me.extendIfNotExists(userProto(user));
            me.emit('ready');
        });
    });
    
    return me;
};

/**
 * Common to all valid user objects
 * @param {object} userInfo The information about the user
 * @type object
 */
function userProto (userInfo) {
    return {
        set: function (prop, value, callback) {
            // Check if we have a hash
            var props = {};
            
            if(arguments.length > 2) {
                props[prop] = value;
            } else {
                callback = value;
            }
            
            for(var i in prop) {
                if(!prop.hasOwnProperty(i)) {
                    continue;
                }

                // Check if this is a writeable property
                if(readOnlyProps.indexOf(i) >= 0) {
                    return callback(error([0x1513, i]));
                }

                // Check if this is valid
                if('function' === typeof validators[prop]) {
                    var validated = validators[prop].call(this, prop, value);

                    if(!validated) {
                        return callback(error(0x1512));
                    }
                }
                
                props[i] = prop[i];
            }

            var me = this;

            // Validated
            db.mongoConnect({db: 'kontakt', collection: 'users'}, function (err, users, db) {
                if(err) {
                    return callback(error(0x1210, err));
                }
                
                users.update({_id: userInfo._id}, {$set: props}, function (err) {
                    if(err) {
                        return callback(error(0x1211, err));
                    }
                    
                    // Update object
                    for(var i in props) {
                        if(props.hasOwnProperty(i)) {
                            userInfo[i] = props[i];
                        }
                    }
                    
                    return callback(null);
                });
            });
        },
        
        get: function (prop) {
            // Check if property is protected
            if(privateProperties.indexOf(prop) >= 0) {
                throw error(0x1514);
            }
            
            // Check if property has a map
            if('string' === typeof propertyMaps[prop]) {
                prop = propertyMaps[prop];
            }
            
            var value = userInfo[prop];
            
            // Check if we have a filter for this property
            if('function' === propertyFilters[prop]) {
                return propertyFilters[prop].call(this, value);
            }
            
            return value;
        },
        
        validatePassword: function (password) {
            return util.hash(password, userInfo.username) === userInfo.password;
        },
        
        changePassword: function (oldPass, newPass, callback) {
            logger.debug('Password change requested', oldPass, newPass);
            
            if(!oldPass) {
                return callback(error(0x1525));
            }
            
            if(!newPass) {
                return callback(error(0x1526));
            }
            
            // Check the old password
            if(!this.validatePassword(oldPass)) {
                return callback(error(0x1527));
            }
            
            // Validate new password
            if(('string' !== typeof newPass) || newPass.length < 6) {
                return callback(error(0x1528));
            }
            
            // Change password
            logger.debug('Changing password', newPass);
            
            db.mongoConnect({db: 'kontakt', collection: 'users'}, function (err, users) {
                if(err) {
                    return me.emit(error(0x1210, err));
                }
                
                newPass = util.hash(newPass, userInfo.username);
                
                users.update({_id: userInfo._id}, {$set: {password: newPass}}, function (err) {
                    if(err) {
                        return callback(error(0x1211, err));
                    }
                    
                    // Update object
                    userInfo.password = newPass;
                    return callback(null);
                });
            });
        },
        
        toString: function () {
            return '<User#{0}>'.format(userInfo.name);
        }
    };
}

/**
 * Common with all user objects
 * @type object
 */
User.prototype = {
    toString: function () {
        return '<User#InvalidUser>';
    }
};

/**
 * Create a new user
 * @param {object} data The user information. username, password, name and email are mandatory
 * @param {function} callback Function receives an error object and a newly created user object
 */
function createUser (data, callback) {
    var username = ('string' === typeof data.username) && data.username.trim(),
        password = ('string' === typeof data.password) && data.password,
        email    = ('string' === typeof data.email) && data.email.trim(),
        name     = ('string' === typeof data.name) && data.name.trim();
        
    if(!util.validator.email(email)) {
        return callback(error(0x1520));
    }
    
    if(!util.validator.username(username)) {
        return callback(error(0x1521));
    }
    
    if(('string' !== typeof password) || password.length < 6) {
        return callback(error(0x1522));
    }
    
    if(!name || !name.length) {
        return callback(error(0x1519));
    }
    
    db.mongoConnect({db: 'kontakt', collection: 'users'}, function (err, users) {
        if(err) {
            return callback(0x1210, err);
        }
        
        users.findOne({username: username}, function (err, user) {
            if(err) {
                // Could not check, let's leave it to the gods
            } else {
                if(user) {
                    return callback(error(0x1523));
                }
            }
            
            users.findOne({email: email}, function (err, user) {
                if(err) {
                    // Could not check, let's leave it to the gods
                } else {
                    if(user) {
                        return callback(error(0x1524));
                    }
                }
                
                // Everything is ready
                delete data._id;
                data.registerDate = new Date();
                data.emailVerified = false;
                data.userId = Math.round(Math.random() * 10E15);
                data.password = util.hash(password, username);
                data.status = 'active';
                
                users.insert(data, function (err) {
                    if(err) {
                        return callback(error(0x1515, err));
                    }
                    
                    // User created, return the user object
                    var user = new User(data.userId);
                    user.on('error', callback);
                    user.on('ready', function () {
                        callback(null, user);
                    });
                });
            });
        });
    });
}

/**
 * Delete a user (Users are not deleted, but marked as "deleted"). All currently
 * open user objects will remain valid.
 * @param {number} userId The userId of the user to delete
 * @param {function} callback Receives an error object, if any
 */
function deleteUser (userId, callback) {
    db.mongoConnect({db: 'kontakt', collection: 'users'}, function (err, users) {
        if(err) {
            return callback(error(0x1210, err));
        }
        
        users.update({userId: Number(userId)}, {$set: {status: 'deleted', deleted: new Date()}}, function (err) {
            if(err) {
                return callback(error(0x1211, err));
            }
            
            return callback(null);
        });
    });
}

/**
 * Properties that are not to be modified directly
 * @type Array
 */
var readOnlyProps = ['_id', 'username', 'registerDate', 'password'];

/**
 * Validation functions for setting properties
 * @type object
 */
var validators = {
    
};

/**
 * Filters for retrieving properties
 * @type object
 */
var propertyFilters = {
    
};

/**
 * List of properties that are not meant to be accessible
 * @type Array
 */
var privateProperties = ['_id', 'password'];

/**
 * Map of property aliases
 * @type object
 */
var propertyMaps = {
    id: 'userId'
};