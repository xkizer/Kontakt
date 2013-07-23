

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
        // instructions for sending the message, including the type of message
        // to can be a single ID or an array of IDs. IDs can be a user, a private
        // group or a public group. Placeholders can be used.
    },
    
    calculateCost: function (from, to, message, callback) {
        // Calculate the cost of sending a message. This mimics sending a message
        // except if actually doesn't send any message or create any message logs
    }
};