const Sequelize = require('sequelize')
const config = require('../config/database')

let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    operatorsAliases: false,
    logging: false
});

module.exports.user = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    tmp_password: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    register_date: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
}, {tableName: 'user', timestamps: false});
module.exports.url = sequelize.define('url', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    content: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    type: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    create_date: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
}, {tableName: 'url', timestamps: false});
module.exports.file = sequelize.define('file', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    location: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    type: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    describe: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    private: {
        type: Sequelize.STRING(1),
        allowNull: false
    },
    create_date: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
}, {tableName: 'file', timestamps: false});
module.exports.like = sequelize.define('like', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    rid: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    fid: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    like_date: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
}, {tableName: 'like', timestamps: false});

module.exports.sequelize = sequelize
module.exports.Sequelize = Sequelize



