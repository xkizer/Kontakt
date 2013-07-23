module.exports = {
    mongo: {
        kontakt: {
            host:   '127.0.0.1',
            port:   27017,
            db:     'kontakt',
            auth:   {
                username: 'kontakt',
                password: 'T4Bmj3LcZmvD'
            },
            collections: ['users','logs','contacts','messages','groups.private','groups.public']
        }
    }
};
