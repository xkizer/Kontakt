/*
 * There are two types of groups: public groups and private groups.
 * 
 * Private
 * groups are used by users to organise their contacts. It can only be used by
 * that user (contacts in the group can be shared like a normal contact can be
 * shared). Private groups have IDs that start with "32." and end with "_ZZ"
 * 
 * The public groups are groups that are not for private use. People's 
 * permissions are required to add them to the groups. Individual group members
 * choose what they want to share with the group and what they don't want to.
 */

module.exports = {
    getPrivateGroups: function (userId, callback) {
        // Get all the user's private groups (groups the user has in their contact)
    },
    
    getUserGroups: function (userId, callback) {
        // Get all the groups the user belongs to (except private groups)
    },
    
    getPublicGroups: function (userId, params, callback) {
        // Search for public groups
    },
    
    getGroup: function (userId, groupId, callback) {
        // Alternative method for instantiating a group object
    },
    
    addToGroup: function (userId, groupId, callback) {
        // Add user to group
    },
    
    removeFromGroup: function (userId, groupId, callback) {
        
    },
    
    createGroup: function (userId, group, callback) {
        // Create a group (public/private)
    },
    
    removeGroup: function (userId, groupId, callback) {
        // Remove a private or public 
    }
};