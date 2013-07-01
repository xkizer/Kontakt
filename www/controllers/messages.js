

module.exports = {
    getMessages: function (params, callback) {
        // Get user's messages. params contains userId
    },
    
    getMessage: function (messageId, callback) {
        // Get a particular message
    },
    
    deleteMessage: function (messageId, callback) {

    },
    
    sendMessage: function (from, to, message, callback) {
        // message is an object containing the message text and some other
        // instructions for sending the message
    }
};