module.exports = {
    apps: [{
        name: 'batcave-server',
        script: 'bin/www',
        autorestart: true,
        watch: true,
        ignore_watch: ['uploads'],
        env: {
            NODE_ENV: 'production'
        },
    }],
};
