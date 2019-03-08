const fileSeq = require('./index').file

class FileModel {
    static async createFile(file) {
        return await fileSeq.create(file)
    }

    static async getFileById(id) {
        return await fileSeq.findOne({
            where: {
                id
            },
            raw: true
        })
    }

    static async getHomeFiles() {
        return await fileSeq.findAll({
            raw: true,
            order: [['create_date', 'DESC']],
            limit: 5
        })
    }

    static async getCountFiles() {
        return await fileSeq.count()
    }

    static async getLimitFiles(offset, limit) {
        return await fileSeq.findAll({
            raw: true,
            order: [['create_date', 'DESC']],
            offset,
            limit
        })
    }

    static async getCountFilesByUid(uid) {
        return await fileSeq.count({
            where: {
                uid
            }
        })
    }

    static async getLimitFilesByUId(uid, offset, limit) {
        return await fileSeq.findAll({
            where: {
                uid
            },
            raw: true,
            order: [['create_date', 'DESC']],
            offset,
            limit
        })
    }
}

module.exports = FileModel
