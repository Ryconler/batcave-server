const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
module.exports = async function (req, res, next) {
    const noAuth = [
        '/uploads',
        '/api/checkLog',
        '/api/sendTmpPsw',
        '/api/urls/home',
        '/api/urls/count',
        '/api/urls/limit',
        '/api/files/home',
        '/api/files/count',
        '/api/files/limit',
        '/api/login',
        '/api/logout',
        '/api/register'
    ]; // 不需要登录认证的路由

    if (req.path.indexOf('/api/files/file/') !== -1 || noAuth.indexOf(req.path) !== -1) {  // 直接访问不需要认证的路由
        await next()
    } else {  // 访问需要认证的路由
        if (req.session.user) {  // 已登录
            await next()
        } else {  // 未登录
            const {username, password} = req.cookies
            if (username && password) {  //尝试使用cookie登录
                /* 登录过程 */
                try {
                    const user = await userModel.getUserByUsername(username)
                    if (user) {  // 先检测用户是否存在
                        if (await bcrypt.compare(password, user.password)) {  //验证密码
                            req.session.user = user // 设置session
                            await next()
                        } else {  // cookie中的 密码错误
                            res.status(401)
                                .json({
                                    message: 'cookie密码错误'
                                })
                        }
                    } else {
                        res.status(401)
                            .json({
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
                res.status(401)
                    .json({
                        message: '未登录'
                    })
            }
        }
    }

}
