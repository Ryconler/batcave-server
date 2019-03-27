const recordModel = require('../models/recordModel')
const userModel = require('../models/userModel')

class RecordController {
    static async createRecord(req, res, next) {
        try {
            const record = req.body
            if (record.content) {
                record.username = req.session.user ? req.session.user.username : '匿名'
                record.create_date = require('../utils/getNowTime')()
                const result = await recordModel.createRecord(record)
                res.json({
                    record: result,
                    message: '留言成功'
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

    static async getHomeRecords(req, res, next) {
        try {
            const results = await recordModel.getHomeRecords()
            res.json({
                records: results
            })
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

    static async deleteURLById(req, res, next) {
        try {
            const params = req.params
            if (params.id) {
                const url = await urlModel.getURLById(params.id)
                if (req.session.user && url.uid === req.session.user.id) {
                    await urlModel.deleteURLById(params.id)
                    res.json({
                        message: '删除成功'
                    })
                } else {
                    res.status(403)
                        .json({
                            message: '没有权限'
                        })
                }
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
                for (let result of results) {
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

    static async getMyURLsCount(req, res, next) {
        try {
            const result = await urlModel.getURLsCountByUId(req.session.user.id)
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

    static async getMyLimitURLs(req, res, next) {
        const limit = 10
        try {
            const query = req.query
            if (query.page) {
                const results = await urlModel.getLimitURLsByUId(req.session.user.id, limit * (query.page - 1), limit)
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

    static async getOtherLimitURLs(req, res, next) {
        const limit = 5
        try {
            const query = req.query
            const params = req.params
            if (query.page && params.uid) {
                const results = await urlModel.getLimitURLsByUId(params.uid, limit * (query.page - 1), limit)
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

    static async getOtherURLsCount(req, res, next) {
        try {
            const params = req.params
            if (params.uid) {
                const result = await urlModel.getURLsCountByUId(params.uid)
                res.json({
                    count: result
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

module.exports = RecordController
