module.exports = Group;

function Group () {
    
}


Group.prototype = {
    toString: function () {
        return '<Group#InvalidGroup>';
    }
};

function groupProto (groupInfo) {
    return {
        getSettings: function () {
            // Get group settings
        },
        
        updateSettings: function () {
            // Group's settings
        },
        
        getContacts: function (userId, query) {
            // Get all the contacts in this group
            // Note that if a user has permission to view another user's info,
            // irrespective of the current group, then that permission is
            // applied when viewing this info
        },
        
        addContact: function (contactId, callback) {
            // Add a contact to the group (for private groups)
        },
        
        removeContact: function (contactId, callback) {
            
        },
        
        shareGroup: function (sharingSettings, callback) {
            // sharingSettings would contain the person to share with, the information
            // to share and those not to share, and every other settings.
        }
    };
}


