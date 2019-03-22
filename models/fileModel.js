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

    static async deleteFileById(id){
        return await fileSeq.destroy({
            where: {
                id
            }
        })
    }

    static async getHomeFiles() {
        return await fileSeq.findAll({
            where:{
                private: '0'
            },
            raw: true,
            order: [['create_date', 'DESC']],
            limit: 5

        })
    }

    static async getCountFiles() {
        return await fileSeq.count({
            where:{
                private: '0'
            }
        })
    }

    static async getLimitFiles(offset, limit) {
        return await fileSeq.findAll({
            where:{
              private: '0'
            },
            raw: true,
            order: [['create_date', 'DESC']],
            offset,
            limit
        })
    }

    static async getPublicFilesCount(uid) {
        return await fileSeq.count({
            where: {
                uid,
                private: '0'
            }
        })
    }
    static async getPrivateFilesCount(uid) {
        return await fileSeq.count({
            where: {
                uid,
                private: '1'
            }
        })
    }
    static async getPublicLimitFiles(uid, offset, limit) {
        return await fileSeq.findAll({
            where: {
                uid,
                private: '0'
            },
            raw: true,
            order: [['create_date', 'DESC']],
            offset,
            limit
        })
    }
    static async getPrivateLimitFiles(uid, offset, limit) {
        return await fileSeq.findAll({
            where: {
                uid,
                private: '1'
            },
            raw: true,
            order: [['create_date', 'DESC']],
            offset,
            limit
        })
    }

}

module.exports = FileModel
