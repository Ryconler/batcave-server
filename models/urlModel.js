const urlSeq = require('./index').url

class URLModel {
    static async createURL(url) {
        return await urlSeq.create(url)
    }

    static async getURLById(id) {
        return await urlSeq.findOne({
            where: {
                id
            },
            raw: true
        })
    }

    static async deleteURLById(id){
        return await urlSeq.destroy({
            where: {
                id
            }
        })
    }
    static async getHomeURLs() {
        return await urlSeq.findAll({
            raw: true,
            order: [['create_date', 'DESC']],
            limit: 5
        })
    }

    static async getCountURLs() {
        return await urlSeq.count()
    }
    static async getLimitURLs(offset, limit) {
        return await urlSeq.findAll({
            raw: true,
            order: [['create_date', 'DESC']],
            offset,
            limit
        })
    }

    static async getURLsCountByUId(uid) {
        return await urlSeq.count({
            where: {
                uid
            }
        })
    }

    static async getLimitURLsByUId(uid, offset, limit) {
        return await urlSeq.findAll({
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

(async function () {
    // console.log(await URLModel.createURL({
    //     uid: 1,
    //     title: 'xx',
    //     content: 'xxx',
    //     type: 'xx',
    //     create_date: '4'
    // }));
    // console.log(await URLModel.getURLById(4));
    // console.log(await URLModel.getLimitURLs(4, 2));
    // console.log(await URLModel.getCountURLs());
    // console.log(await URLModel.getLimitURLsByUId(1,1,2));
    // console.log(await URLModel.getCountURLsByUid(0));
})();
module.exports = URLModel
