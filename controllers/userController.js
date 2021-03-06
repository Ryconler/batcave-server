const bcrypt = require('bcryptjs')

const userModel = require('../models/userModel')

let t

class UserController {
    static async checkLog(req,res,next){
        const user = req.session.user
        if(user){
            res.json({
                user
            })
        }else {
            const {username, password} = req.cookies
            if (username && password) {  //尝试使用cookie登录
                try {
                    const user = await userModel.getUserByUsername(username)
                    if (user) {  // 先检测用户是否存在
                        if (await bcrypt.compare(password, user.password)) {  //验证密码
                            req.session.user = user // 设置session
                            res.json({
                                user
                            })
                        } else {  // cookie中的 密码错误
                            res.json({
                                    message: 'cookie密码错误'
                                })
                        }
                    } else {
                        res.json({
                                message: 'cookie用户名不存在'
                            })
                    }
                } catch (e) {
                    res.status(500)
                    res.json({
                        message: e.message
                    })
                }
            } else {  // 没有cookie
                res.json({
                        message: '没有cookie'
                    })
            }
        }
    }
    static async login(req,res,next){
        try{
            const user = await userModel.getUserByUsername(req.body.username)
            if(user){  // 先检测用户是否存在
                const password = user.password
                const tmp_password = user.tmp_password||''
                if (await bcrypt.compare(req.body.password, password)||await bcrypt.compare(req.body.password, tmp_password)) {  //验证密码
                    // 设置session
                    req.session.user = user
                    res.json({
                        user,
                        message: '登录成功'
                    })
                } else {
                    res.status(403)
                        .json({
                            message: '密码错误',
                        })
                }
            }else {
                res.status(403)
                    .json({
                        message: '用户名不存在'
                    })
            }
        }catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }
    static async logout(req,res,next){
        delete req.session.user
        res.json({
            user: req.session.user,
            message: '账号已退出'
        })
    }
    static async sendTmpPsw(req,res){
        try{
            const user = await userModel.getUserByUsername(req.body.username)
            if(user){  // 先检测用户是否存在
                const tmp_password = require('../utils/getRandomPassword')()
                const hash = await bcrypt.hash(tmp_password, 10)
                await userModel.changeTmpPassword(user.id,hash)
                clearTimeout(t)
                t = setTimeout(async function () {  // 三分钟后清除临时密码
                    await userModel.changeTmpPassword(user.id,'')
                },1000*60*3)
                let sendEmail=require('../utils/sendEmail')
                sendEmail(user.email, tmp_password,function (result) {
                    res.json({
                        message: result
                    })
                })
            }else {
                res.status(403)
                    .json({
                        message: '用户名不存在'
                    })
            }
        }catch (e) {
            console.log(e.message);
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }
    static async register(req,res,next){
        const user = req.body
        user.password =await bcrypt.hash(req.body.password, 10)  //加密的密码
        user.register_date = require('../utils/getNowTime')()
        try{
            if(await userModel.getUserByUsername(req.body.username)){
                res.status(403)
                    .json({
                        message: '用户名已存在'
                    })
            }else {
                const newUser = await userModel.createUser(user)
                req.session.user = newUser
                res.json({
                    user,
                    message: '注册成功'
                })
            }
        }catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }
    static async changePassword(req,res,next){
        const id = req.session.user.id
        let {newPassword} = req.body
        newPassword =await bcrypt.hash(newPassword, 10)  //加密的密码
        try{
            await userModel.changePassword(id,newPassword)
            res.json({
                message: '修改成功'
            })
        }catch (e) {
            res.status(500)
            res.json({
                message: e.message
            })
        }
    }
}

module.exports = UserController
