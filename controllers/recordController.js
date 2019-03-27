const recordModel = require('../models/recordModel')

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
}

module.exports = RecordController
