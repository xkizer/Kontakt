
module.exports = {
    addContact: function (userId, contact, callback) {
        // TODO: Check for the special userId field in the contact object
    },
    
    getContacts: function (userId, query, callback) {
        
    },
    
    getContact: function (userId, contactId, callback) {
        
    },
    
    removeContact: function (userId, contactId, callback) {

    },
    
    shareInfo: function (shareWith, fields, callback) {
        // Share your info with another person/group
        // The "fields" replaces the current "fields" stored. Omit the field
        // To stop sharing completely (the person will still be able to view your
        // public shared data)
    },
    
    getSharingContacts: function (callback) {
        // Get people that are sharing their information with me
    },
    
    getSharedContacts: function (callback) {
        // Get people that I am sharing info with
    },
    
    getSharingContact: function (contactId, callback) {
        // Get all the information the user is sharing with me
    },
    
    getSharedContact: function (contactId, callback) {
        // Get all the information I am sharing with the user. If contactId is
        // not specified, get information I'm sharing with the public
    },
        
    mergeContacts: function (mergeFrom, mergeInto, callback) {
        // Note: two shared contacts can't be merged. At least one contact
        // has to be a static contact (a contact that is no linked to any
        // account)
    }
};
