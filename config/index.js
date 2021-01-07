const devFlag = process.env.NODE_ENV !== 'production';

module.exports = {
    devFlag,
    baseURL: devFlag ? 'http://localhost:8080' : process.env.CORS_ORIGIN,
    port: 5000
}
