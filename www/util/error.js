/**
 * Error codes and associated messages
 */
module.exports = function (code, original) {
    var args;
    
    if(Array.isArray(code)) {
        args = code;
        code = args.shift();
    }
    
    if(errorCodes[code]) {
        // Code exists
        var msg = errorCodes[code];
        
        if(args) {
            msg = msg.printf(args);
        }
        
        var error = {
            message: msg,
            codeStr: '0x' + code.toString(16).toUpperCase(),
            code: code
        };

        if(original) {
            error.originalError = original;
        }
        
        logger.error(error);
        return error;
    }

    // Code does not exist... probably not an error code. Transmit.
    return code;
};

var errorCodes = {
    // SYSTEM ERRORS
    0x1210: 'Database connection error',                                        // Could not connect
    0x1211: 'Database error',                                                   // Could not query
    
    0x1220: 'Login required',                                                   // Session expired or not logged in
    
    0x1240: 'Unable to initialize session',
    
    
    //// USER MODEL
    0x1510: 'User not found',                                                   // While retrieving user
    0x1512: 'Cannot set property: validation failed',                           // While setting user's property
    0x1513: 'Cannot set property "%s": property is read-only',                       // Tried setting a read-only property
    0x1514: 'Property not publicly available',                                  // Tried accessing a private property
    0x1515: 'Could not create user: database failure',
    
    0x1519: 'No name provided',                                                 
    0x1520: 'Invalid email address',
    0x1521: 'Invalid username',
    0x1522: 'Unacceptable password',
    0x1523: 'Username already exists',
    0x1524: 'Email already registered',
    0x1525: 'Please provide old password',
    0x1526: 'Please provide new password',
    0x1527: 'Provided password does not match what\'s on file',
    0x1528: 'New password is unacceptable. Pick another password.',
    
    
    0x1550: 'Bad username/password combination',
    
    0x2900: 'Server error while logging in',                                    // Redis server fail during login
    0x2901: 'Username and password did not match',
    0x2902: 'Account is inactive. Please make sure you have verified account and that account is not blocked.',
    0x2903: 'Server error while loging in',                                     // MongoDB connection error
    0x2904: 'Serever error while login in',                                     // MongoDB query failure
    0x290C: 'No session data provided',                                         // Attempt to create session with bad session details

    0x2A00: 'Server error while retrieving session information',                // Redis pooped on the pants
    0x2A01: 'Session information not found',                                    // Occurs when we cannot find the session identified by the given key
    0x2A02: 'Saved session signature does not match current client signature',  // Occurs when the IP address on file or the user agent does not match the one saved on the server when the session was created
    0x2A04: 'Cannot update inexistent session',

};
