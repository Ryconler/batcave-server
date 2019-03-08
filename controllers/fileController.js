


const fileModel = require('../models/fileModel')
const userModel = require('../models/userModel')

class FileController {
    static async createFile(req, res, next) {
        try {
            const file = req.body
            if (file.title && file.type && file.private) {
                file.uid = req.session.user.id
                file.location = req.files[0].filename
                file.create_date = require('../utils/getNowTime')()
                const result = await fileModel.createFile(file)
                res.json({
                    file: result,
                    message: '上传成功'
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

    static async getFileById(req, res, next) {
        try {
            const params = req.params
            if (params.id) {
                const result = await fileModel.getFileById(params.id)
                result.owner = await userModel.getUserById(result.uid)
                delete result.owner.password
                delete result.owner.email
                delete result.owner.register_date
                res.json({
                    file: result
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

    static async getHomeFiles(req, res, next){
        try {
            const results = await fileModel.getHomeFiles()
            for(let result of results){
                result.owner = await userModel.getUserById(result.uid)
                delete result.owner.password
                delete result.owner.email
                delete result.owner.register_date
            }
            res.json({
                files: results
            })
        } catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }

    static async getCountFiles(req, res, next) {
        try {
            const result = await fileModel.getCountFiles()
            res.json({
                num: result
            })
        } catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }

    static async getLimitFiles(req, res, next) {
        const limit = 10
        try {
            const query = req.query
            if (query.page) {
                const results = await fileModel.getLimitFiles(limit * (query.page - 1), limit)
                for(let result of results){
                    result.owner = await userModel.getUserById(result.uid)
                    delete result.owner.password
                    delete result.owner.email
                    delete result.owner.register_date
                }
                res.json({
                    files: results
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

    static async getCountFilesByUid(req, res, next) {
        try {
            const params = req.params
            if (params.uid) {
                const result = await fileModel.getCountFilesByUid(params.uid)
                res.json({
                    num: result
                })
            }
        } catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }

    static async getLimitFilesByUid(req, res, next) {
        const limit = 5
        try {
            const query = req.query
            const params = req.params
            if (query.page && params.uid) {
                const results = await fileModel.getLimitFilesByUId(params.uid, limit * (query.page - 1), limit)
                for(let result of results){
                    result.owner = await userModel.getUserById(result.uid)
                    delete result.owner.password
                    delete result.owner.email
                    delete result.owner.register_date
                }
                res.json({
                    files: results
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

module.exports = FileController
