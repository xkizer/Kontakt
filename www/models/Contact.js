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
            // Note, only fields stored by the user can be removed. Fields
            // that are being shared will automatically peek through once manually
            // entered fields are deleted. To remove the shared info, the user
            // has to edit the share.
        },
        
        shareContact: function (sharingSetting, callback) {
            // Note: callback is given an error object and a new Contact object,
            // representing the newly created copy of the contact. If the user
            // who is sharing the contact is the same as the owner
            // (Contact#userId = Contact#owner#userId), we create a linkage
            // (allowing the shared contact to be updated automatically), if the
            // user chooses to. Otherwise we ignore the setting altogether.
        },
        
        getSharedFields: function (callback) {
            // Get all the auto-updated fields (with their values)
        },
        
        getStaticFields: function (callback) {
            // Get all the fields that the user added manually or has frozen
        },
        
        freezeField: function (field, callback) {
            // Convert a field to a static field. This is useful in cases where
            // you a user is interested only in the contact's current information,
            // and does not want it overwritten by an update. The sharing will
            // remain, but any new update won't reflect
        },
        
        /**
         * Update the sharing information. Note: only removals can be done. Any
         * new field will result in a share request being sent.
         * @param {type} newShare
         * @param {type} callback
         * @returns {undefined}
         */
        updateShare: function (newShare, callback) {
            // Update what is shared. The owner of this contact chooses what to
            // share with this user. This user can then remove what they don't
            // want. To re-enable the sharing, they will need to request permission.
        },
        
        /**
         * Request this contact to share certain information
         * @param {array} fields List of fields to request
         * @param {string} message (optional) An optional message to convey the 
         * intent of the user
         * @param {function} callback
         */
        requestSharing: function (fields, message, callback) {
            // Request this contact to share some information
            // Works only on shared contacts
        }
    };
}

