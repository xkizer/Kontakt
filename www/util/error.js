/**
 * Error codes and associated messages
 */
module.exports = function (code, original) {
    if(errorCodes[code]) {
        // Code exists
        var error = {
            message: errorCodes[code],
            codeStr: '0x' + code.toString(16).toUpperCase(),
            code: code
        };

        if(original) {
            error.originalError = original;
            console.error(original);
        }

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
    0x1513: 'Cannot set property: property is read-only',                       // Tried setting a read-only property
    0x1514: 'Property not publicly available',                                  // Tried accessing a private property
    0x1515: 'Could not create user: database failure',
    
    0x1519: 'No name provided',                                                 
    0x1520: 'Invalid email address',
    0x1521: 'Invalid username',
    0x1522: 'Unacceptable password',
    0x1523: 'Username already exists',
    0x1524: 'Email already registered',
    
    0x1550: 'Bad username/password combination',
    
    
};
