const urlModel = require('../models/urlModel')
const userModel = require('../models/userModel')

class UserController {
    static async createURL(req, res, next) {
        try {
            const url = req.body
            if (url.title && url.content && url.type) {
                url.uid = req.session.user.id
                url.create_date = require('../utils/getNowTime')()
                const result = await urlModel.createURL(url)
                res.json({
                    url: result,
                    message: '分享成功'
                })
            } else {
                res.status(400)
                    .json({
                        message: '缺少字段'
                    })
            }

        } catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }

    static async getURLById(req, res, next) {
        try {
            const params = req.params
            if (params.id) {
                const result = await urlModel.getURLById(params.id)
                result.owner = await userModel.getUserById(result.uid)
                /* 去除隐私信息 */
                delete result.owner.password
                delete result.owner.email
                delete result.owner.register_date
                res.json({
                    url: result
                })
            } else {
                res.status(400)
                    .json({
                        message: '缺少字段'
                    })
            }
        } catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }

    static async getHomeURLs(req, res, next) {
        try {
            const results = await urlModel.getHomeURLs()
            for(let result of results){
                result.owner = await userModel.getUserById(result.uid)
                delete result.owner.password
                delete result.owner.email
                delete result.owner.register_date
            }
            res.json({
                urls: results
            })
        } catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }

    static async getCountURLs(req, res, next) {
        try {
            const result = await urlModel.getCountURLs()
            res.json({
                count: result
            })
        } catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }

    static async getLimitURLs(req, res, next) {
        const limit = 10
        try {
            const query = req.query
            if (query.page) {
                const results = await urlModel.getLimitURLs(limit * (query.page - 1), limit)
                for(let result of results){
                    result.owner = await userModel.getUserById(result.uid)
                    delete result.owner.password
                    delete result.owner.email
                    delete result.owner.register_date
                }
                res.json({
                    urls: results
                })
            } else {
                res.status(400)
                    .json({
                        message: '缺少参数'
                    })
            }
        } catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }

    static async getCountURLsByUid(req, res, next) {
        try {
            const params = req.params
            if (params.uid) {
                const result = await urlModel.getCountURLsByUid(params.uid)
                res.json({
                    count: result
                })
            }
        } catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }

    static async getLimitURLsByUid(req, res, next) {
        const limit = 10
        try {
            const query = req.query
            const params = req.params
            if (query.page && params.uid) {
                const results = await urlModel.getLimitURLsByUId(params.uid, limit * (query.page - 1), limit)
                for(let result of results){
                    result.owner = await userModel.getUserById(result.uid)
                    delete result.owner.password
                    delete result.owner.email
                    delete result.owner.register_date
                }
                res.json({
                    urls: results
                })
            } else {
                res.status(400)
                    .json({
                        message: '缺少参数'
                    })
            }
        } catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }
    static async getLimit5URLsByUid(req, res, next) {
        const limit = 5
        try {
            const query = req.query
            const params = req.params
            if (query.page && params.uid) {
                const results = await urlModel.getLimitURLsByUId(params.uid, limit * (query.page - 1), limit)
                for(let result of results){
                    result.owner = await userModel.getUserById(result.uid)
                    delete result.owner.password
                    delete result.owner.email
                    delete result.owner.register_date
                }
                res.json({
                    urls: results
                })
            } else {
                res.status(400)
                    .json({
                        message: '缺少参数'
                    })
            }
        } catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }
}

module.exports = UserController
