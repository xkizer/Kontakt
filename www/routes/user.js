var user = require('../controllers/user');

module.exports = function (app) {
    app.post('/user/create', user.register);                            // Create a new account
    app.post('/user/login', user.login);                                // Login the user
    app.put('/user/password', user.changePassword);               // Change password
    
    // TODO: Implement password reset when email notifications have been completed
    app.put('/user/password', user.resetPassword);                       // Reset password
    app.post('/user/password/recover', user.recoverPassword);                  // Recover password
    
    app.put('/user/edit', user.editUser);                               // Edit user information
    
    // TODO: accoutn deletion should work like password reset, with a token sent
    // to the user's mail, and the user required to confirm their account password
    app.delete('/user', user.deleteAccount);                            // Delete account
    
    app.get('/user/:userId([0-9]{14,17})', user.getInfo);               // Get basic information about a user
    app.post('/user/picture', user.changeProfilePicture);               // Change user's profile picture
    app.get('/user/:userId([0-9]{14,17})/picture', user.getPicture);    // Get the user's profile picture
    
    
};