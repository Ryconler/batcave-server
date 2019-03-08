module.exports = {
    apps: [{
        name: 'batcave-server',
        script: 'bin/www',
        autorestart: true,
        watch: true,
        env: {
            NODE_ENV: 'production'
        },
    }],
};
