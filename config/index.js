const devFlag = process.env.NODE_ENV !== 'production';

module.exports = {
    devFlag,
    baseURL: devFlag ? '*' : process.env.CORS_ORIGIN,
    port: 5000
}
