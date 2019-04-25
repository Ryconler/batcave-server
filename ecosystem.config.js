module.exports = {
    apps: [{
        name: 'batcave-server',
        script: 'bin/www',
        watch: true,
        ignore_watch: ['uploads','node_modules'],
        env: {
            NODE_ENV: 'production'
        },
    }],
};
