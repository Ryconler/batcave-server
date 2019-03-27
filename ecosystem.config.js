module.exports = {
    apps: [{
        name: 'batcave-server',
        script: 'bin/www',
        watch: true,
        ignore_watch: ['uploads'],
        env: {
            NODE_ENV: 'production'
        },
    }],
};
