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
        getSettings: function (callback) {
            // Get group settings
        },
        
        updateSettings: function (callback) {
            // Group's settings
        },
        
        getOwner: function (callback) {
            // Get the owner of the group
        },
        
        canView: function (userId, callback) {
            // Can the user view the group?
        },
        
        canEdit: function (userId, callback) {
            // Can the user edit the group?
        },
        
        canInvite: function () {
            // Does user have invite privilege?
        },
        
        isAdmin: function (userId, callback) {
            // Is the user an admin?
        },
        
        isOwner: function (userId, callback) {
            // Is this the group owner?
        },
        
        getAdmins: function (callback) {
            // Get the list of the group admins
        },
        
        getContacts: function (userId, query, callback) {
            // Get all the contacts in this group
            // Note that if a user has permission to view another user's info,
            // irrespective of the current group, then that permission is
            // applied when viewing this info
        },
        
        leaveGroup: function (userId, callback) {
            // Remove the user from this group
        },
        
        joinGroup: function (userId, callback) {
            // Join (or request to join) group
        },
        
        addAdmin: function (userId, callback) {
            // Add a new group admin
        },
        
        deleteGroup: function (callback) {
            // Delete this group
        },
        
        sendInvite: function (from, to, callback) {
            // Add a contact to the group (for private groups)
        },
        
        cancelInvite: function (inviteId, callback) {
            
        },
        
        acceptInvite: function (inviteId, callback) {
            
        },
        
        isInvited: function (userId, callback) {
            
        },
        
        isMember: function (userId, callback) {
            
        }
    };
}


