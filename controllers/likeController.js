const likeModel = require('../models/likeModel')
const userModel = require('../models/userModel')

class LikeController {
    static async createLike(req, res, next) {
        try {
            const {rid, fid} = req.body
            const uid = req.session.user.id
            const like = {
                uid,
                rid,
                fid,
                like_date: require('../utils/getNowTime')()
            }
            const result = await likeModel.createLike(like)
            res.json({
                like: result,
                message: '喜欢成功'
            })
        } catch (e) {
            res.status(500)
                .json({
                    message: e.message
                })
        }

    }

    static async unlikeURL(req, res, next) {
        try {
            const rid = req.params.rid
            const uid = req.session.user.id
            const result = await likeModel.unlikeURL(uid,rid)
            res.json({
                like: result,
                message: '取消成功'
            })
        } catch (e) {
            res.status(500)
                .json({
                    message: e.message
                })
        }
    }

    static async unlikeFile(req, res, next) {
        try {
            const fid = req.params.fid
            const uid = req.session.user.id
            const result = await likeModel.unlikeFile(uid,fid)
            res.json({
                like: result,
                message: '取消成功'
            })
        } catch (e) {
            res.status(500)
                .json({
                    message: e.message
                })
        }
    }

    static async getURLLikesIdByUId(req, res, next) {
        try {
            const uid = req.session.user.id
            const results = await likeModel.getURLLikesByUId(uid)
            let likes = []
            for(let result of results){
                likes.push(result.rid)
            }
            res.json({
                likes
            })
        } catch (e) {
            res.status(500)
                .json({
                    message: e.message
                })
        }
    }

    static async getFileLikesIdByUId(req, res, next) {
        try {
            const uid = req.session.user.id
            const results = await likeModel.getFileLikesByUId(uid)
            let likes = []
            for(let result of results){
                likes.push(result.fid)
            }
            res.json({
                likes
            })
        } catch (e) {
            res.status(500)
                .json({
                    message: e.message
                })
        }
    }

    static async getLimitURLLikesByUId(req, res, next) {
        try {
            const limit = 5
            const uid = req.session.user.id
            const page = req.query.page
            const results = await likeModel.getLimitURLLikesByUId(uid,limit * (page - 1),limit)
            res.json({
                likes: results
            })
        } catch (e) {
            res.status(500)
                .json({
                    message: e.message
                })
        }
    }

    static async getLimitFileLikesByUId(req, res, next) {
        try {
            const limit = 5
            const uid = req.session.user.id
            const page = req.query.page
            const results = await likeModel.getLimitFileLikesByUId(uid,limit * (page - 1),limit)
            res.json({
                likes: results
            })
        } catch (e) {
            res.status(500)
                .json({
                    message: e.message
                })
        }
    }

}

module.exports = LikeController
