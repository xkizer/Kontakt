module.exports = Contact;

function Contact (contactId) {
    
}

Contact.prototype = {
    toString: function () {
        return '<Contact#InvalidContact>';
    }
};

function contactProto (contact) {
    return {
        /**
         * Get the groups the user have been added to in MY address book
         * @param {function} callback Receives error object and array of groups
         */
        getGroups: function (callback) {
            
        },
        
        addToGroup: function (groupId, callback) {
            
        },
        
        removeFromGroup: function (groupId, callback) {
            
        },
        
        /**
         * Totally overhaul the user's information (note, removed fields will
         * pave way for the user's shared info to peek through)
         * @param {object} newInfo The new user's contact information
         * @param {function} callback Gets an error object
         */
        updateInfo: function (newInfo, callback) {
            
        },
        
        /**
         * Add/update fields to the user's contact information. Note that this
         * affects ONLY the fields in the provided data. Missing fields are skipped.
         * @param {object} data The object describing what should be added. Note
         * that array values will be replaced.
         * @param {function} callback Function receives error object
         */
        addFields: function (data, callback) {
            
        },
        
        removeFields: function (fields, callback) {
            // Fields is an array
        },
        
        shareContact: function (sharingSetting, callback) {
            // Note: callback is given an error object and a new Contact object,
            // representing the newly created copy of the contact. If the user
            // who is sharing the contact is the same as the owner
            // (Contact#userId = Contact#owner#userId), we create a linkage
            // (allowing the shared contact to be updated automatically), if the
            // user chooses to. Otherwise we ignore the setting altogether.
        },
        
        getSharedFields: function () {
            // Get all the auto-updated fields (with their values)
        },
        
        getStaticFields: function () {
            // Get all the fields that the user added manually or has frozen
        },
        
        freezeField: function () {
            // Convert a field to a static field. This is useful in cases where
            // you a user is interested only in the contact's current information,
            // and does not want it overwritten by an update.
        }
    };
}

