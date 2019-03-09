const likeSeq = require('./index').like
const urlSeq = require('./index').url
const Sequelize = require('./index').Sequelize
const Op = Sequelize.Op
const sequelize = require('./index').sequelize

class LikeModel {
    static async createLike(like) {
        return await likeSeq.create(like)
    }

    static async unlikeURL(uid, rid) {
        return await likeSeq.destroy({
            where: {
                uid,
                rid
            }
        })
    }

    static async unlikeFile(uid, fid) {
        return await likeSeq.destroy({
            where: {
                uid,
                fid
            }
        })
    }

    static async getURLLikesByUId(uid) {
        return await likeSeq.findAll({
            where: {
                uid,
                rid: {
                    [Op.ne]: null
                }
            },
            raw: true
        })
    }

    static async getFileLikesByUId(uid) {
        return await likeSeq.findAll({
            attributes: ['fid'],
            where: {
                uid,
                fid: {
                    [Op.ne]: null
                }
            },
            raw: true
        })
    }

    static async getLimitURLLikesByUId(uid, offset,  limit) {
        return await sequelize.query(
            'select * from `url` JOIN `like` on `url`.id = `like`.rid where `like`.uid = ? limit ? offset ?',
            {replacements: [uid,limit,offset], type: sequelize.QueryTypes.SELECT}
        )
    }

    static async getLimitFileLikesByUId(uid, offset, limit) {
        return await sequelize.query(
            'select * from `file` JOIN `like` on `file`.id = `like`.fid where `like`.uid = ? limit ? offset ?',
            {replacements: [uid,limit,offset], type: sequelize.QueryTypes.SELECT}
        )
    }
}

(async function () {
    // console.log(await LikeModel.getLimitURLLikesByUId(6,0,5));
    // console.log(await LikeModel.getFileLikesByUId(1));
    // console.log(await LikeModel.unlikeURL(6,11));
    // console.log(await LikeModel.getFilesByUId(1));
})();
module.exports = LikeModel
