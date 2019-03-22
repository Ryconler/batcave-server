const fs = require('fs')
const path = require('path');
const fileModel = require('../models/fileModel')
const userModel = require('../models/userModel')

class FileController {
    static async createFile(req, res, next) {
        try {
            const file = req.body
            if (file.title && file.type && file.private) {
                switch (file.type) {
                    case 'image':
                        file.type = '图片'
                        break
                    case 'setup':
                        file.type = '安装包'
                        break
                    case 'document':
                        file.type = '文档'
                        break
                    case 'compress':
                        file.type = '压缩包'
                        break
                    default:
                        file.type = '其他'
                        break
                }
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
                let file = await fileModel.getFileById(params.id)
                if (!file || (file.private === '1' && (!req.session.user || file.uid !== req.session.user.id))) {
                    res.status(403)
                        .json({
                            message: '你无权查看此文件'
                        })
                }else {
                    file.owner = await userModel.getUserById(file.uid)
                    delete file.owner.password
                    delete file.owner.email
                    delete file.owner.register_date
                    res.json({
                        file
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

    static async deleteFileById(req, res, next) {
        try {
            const params = req.params
            if (params.id) {
                const file = await fileModel.getFileById(params.id)
                if(req.session.user && file.uid === req.session.user.id){
                    await fileModel.deleteFileById(params.id)
                    fs.unlink(path.join(__dirname,'../uploads',file.location),function(error){
                        if(error){
                            console.log(error);
                            return false;
                        }
                    })
                    res.json({
                        message: '删除成功'
                    })
                }else {
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

    static async getHomeFiles(req, res, next) {
        try {
            const results = await fileModel.getHomeFiles()
            for (let result of results) {
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
                count: result
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
                for (let result of results) {
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

    static async getMyPublicFilesCount(req, res, next) {
        try {
            const result = await fileModel.getPublicFilesCount(req.session.user.id)
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

    static async getMyPrivateFilesCount(req, res, next) {
        try {
            const result = await fileModel.getPrivateFilesCount(req.session.user.id)
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

    static async getMyPublicLimitFiles(req, res, next) {
        const limit = 5
        try {
            const query = req.query
            if (query.page) {
                const results = await fileModel.getPublicLimitFiles(req.session.user.id, limit * (query.page - 1), limit)
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

    static async getMyPrivateLimitFiles(req, res, next) {
        const limit = 5
        try {
            const query = req.query
            if (query.page) {
                const results = await fileModel.getPrivateLimitFiles(req.session.user.id, limit * (query.page - 1), limit)
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

    static async getOtherPublicLimitFiles(req, res, next) {
        const limit = 5
        try {
            const query = req.query
            const params = req.params
            if (query.page && params.uid) {
                const results = await fileModel.getPublicLimitFiles(params.uid, limit * (query.page - 1), limit)
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

    static async getOtherPublicFilesCount(req, res, next) {
        try {
            const params = req.params
            if (params.uid) {
                const result = await fileModel.getPublicFilesCount(params.uid)
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

module.exports = FileController
