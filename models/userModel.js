const userSeq = require('./index').user

class UserModel {
    static async createUser(user) {
        return await userSeq.create(user)
    }
    static async getUserById(id){
        return await userSeq.findOne({
            where: {
                id
            },
            raw: true
        })
    }
    static async getUserByUsername(username) {
        return await userSeq.findOne({
            where: {
                username
            },
            raw: true
        })
    }
}
// (async function(){
//     console.log(await UserModel.getUserByUsername('123'));
// })();
module.exports = UserModel
