const recordSeq = require('./index').record

class FileModel {
    static async createRecord(record) {
        return await recordSeq.create(record)
    }

    static async getRecordById(id) {
        return await recordSeq.findOne({
            where: {
                id
            },
            raw: true
        })
    }

    static async deleteRecordById(id){
        return await recordSeq.destroy({
            where: {
                id
            }
        })
    }

    static async getHomeRecords() {
        return await recordSeq.findAll({
            raw: true,
            order: [['create_date', 'DESC']],
            limit: 5
        })
    }

    static async getCountRecords() {
        return await recordSeq.count()
    }

    static async getLimitRecords(offset, limit) {
        return await recordSeq.findAll({
            raw: true,
            order: [['create_date', 'DESC']],
            offset,
            limit
        })
    }
}

module.exports = FileModel
