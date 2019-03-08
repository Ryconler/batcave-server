const likeSeq = require('./index').like

class LikeModel {
    static async createLike(like) {
        return await likeSeq.create(like)
    }
    static async getLikesByUId(uid) {
        return await fileSeq.findAll({
            where:{
                uid
            },
            raw: true
        })
    }
}
(async function(){
    console.log(await LikeModel.createLike({
        uid: 1,
        fid: 2,
        like_date: 'xx'
    }));
    // console.log(await LikeModel.getFiles());
    // console.log(await LikeModel.getFilesByUId(1));
})();
module.exports = LikeModel
