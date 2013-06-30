module.exports = Contact;

function Contact (contactId) {
    
}

Contact.prototype = {
    toString: function () {
        return '<User#InvalidUser>';
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
        }
    };
}

