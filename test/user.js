require('../www/util/extend');
var usr = require('../www/models/User'),
    test = require('tape'),
    cli = require('cli-color');

test('User initialization', function (t) {
    t.equal(typeof usr.User, 'function', 'User constructor is a function');
    
    // Invalid user
    var user = new usr.User('invalid user');
    user.on('error', function (err) {
        t.equal(err.code, 0x1510, 'Invalid user initialization emitted error');
    });
    
    user.on('ready', function () {
        t.fail('User initialization should fail');
    });
    
    // Create new user
    var rand = Math.round(Math.random() * 10E6);
    var userId;
    
    usr.createUser({
        email: 'kizer' + rand + '@kizer.com.ng',
        username: 'rand_' + rand,
        password: 'Password'
    }, function (err, user) {
        t.equal(err.code, 0x1519, 'No name provided, registration fails');
    });
    
    usr.createUser({
        name: 'Chinenye Onuegbu',
        email: 'kizer' + rand + '@kizer..com.ng',
        username: 'rand_' + rand,
        password: 'Password'
    }, function (err, user) {
        t.equal(0x1520, err.code, 'Invalid email provided, registration fails');
    });
    
    usr.createUser({
        name: 'Chinenye Onuegbu',
        email: 'kizer' + rand + '@kizer.com.ng',
        username: '8rand_' + rand,
        password: 'Password'
    }, function (err, user) {
        t.equal(0x1521, err.code, 'Invalid username provided, registration fails');
    });
    
    usr.createUser({
        name: 'Chinenye Onuegbu',
        email: 'kizer' + rand + '@kizer.com.ng',
        username: 'rand_' + rand,
        password: 'pa'
    }, function (err, user) {
        t.equal(0x1522, err.code, 'Invalid password provided, registration fails');
    });
    
    usr.createUser({
        name: 'Chinenye Onuegbu',
        email: 'kizer' + rand + '@kizer.com.ng',
        phone: '08030' + rand,
        username: 'rand_' + rand,
        password: 'Password'
    }, function (err, user) {
        t.equal(err, null, 'User creation threw no error');
        t.equal('object', typeof user, 'Valid object returned');
        t.ok(user instanceof usr.User, 'Returned user object is a valid User');
        t.equal(user.get('name'), 'Chinenye Onuegbu', "User's name is correct");
        t.throws(function () {user.get('_id')}, "Accessing _id throws exception: protected property");
        t.equal(user.get('username'), 'rand_' + rand, 'Username matches');
        userId = user.get('userId');
        t.equal(userId, user.get('id'), 'Getting userId via alias id works');
    
        usr.createUser({
            name: 'Chinenye Onuegbu',
            email: 'kizers' + rand + '@kizer.com.ng',
            username: 'rand_' + rand,
            password: 'Password'
        }, function (err, user) {
            t.equal(0x1523, err.code, 'Username already registered, registration fails');
        });
    
        usr.createUser({
            name: 'Chinenye Onuegbu',
            email: 'kizer' + rand + '@kizer.com.ng',
            username: 'rands_' + rand,
            password: 'Password'
        }, function (err, user) {
            t.equal(0x1524, err.code, 'Email already registered, registration fails');
        });
        
        (function () {
            // Initialize a new user object
            var user = new usr.User('rand_' + rand);

            user.on('error', function (err) {
                t.fail('User object initialization failed [username]');
            });

            user.on('ready', function () {
                t.pass('User initialization succeeded [username]');

                user.set('username', 'random username', function (err) {
                    t.equal(0x1513, err.code, 'Username is a read-only property');
                });

                user.set('name', 'Ubuntu Ubuntuki', function (err) {
                    t.equal(err, null, 'Name was changed');
                    t.equal(user.get('name'), 'Ubuntu Ubuntuki', 'New name change reflected');
                });
            });
        })();
        
        setTimeout(function () {
            // Initialize a new user object
            var user = new usr.User(userId);

            user.on('error', function (err) {
                console.error(err);
                t.fail('User object initialization failed [userId]');
            });

            user.on('ready', function () {
                t.pass('User initialization succeeded [userId]');
                t.equal(user.get('name'), 'Ubuntu Ubuntuki', 'Name change was persistent');
            });
        }, 1000);
        
        setTimeout(function () {
            usr.deleteUser(userId, function (err) {
                // Check if user can still be initialized
                var u = new usr.User(userId);
                u.on('error', function (err) {
                    t.equal(err.code, 0x1510, 'Deleted user could not be initialized');
                    t.end();
                });
                
                u.on('ready', function () {
                    t.fail('Deleted user should fail to initialize');
                    t.end();
                });
            });
        }, 2000);
    });
});

