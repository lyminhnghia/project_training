require('dotenv').config()
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('./config.json')[env]

let sequelize
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
}

const db = {}
 
db.Sequelize = Sequelize
db.sequelize = sequelize

db.user             =   require('../models/user')(sequelize, Sequelize)
db.faculty          =   require('../models/faculty')(sequelize, Sequelize)
db.country          =   require('../models/country')(sequelize, Sequelize)
db.partner          =   require('../models/partner')(sequelize, Sequelize)
db.user_partner     =   require('../models/user_partner')(sequelize, Sequelize)
db.cooperation      =   require('../models/cooperation')(sequelize, Sequelize)
db.main_cooperation =   require('../models/main_cooperation')(sequelize, Sequelize)
db.member_sign      =   require('../models/member_sign')(sequelize, Sequelize)
db.coo_faculty      =   require('../models/cooperation_faculties')(sequelize, Sequelize)
db.coo_member       =   require('../models/member_sign_cooperations')(sequelize, Sequelize)
db.coo_partner      =   require('../models/user_partner_cooperations')(sequelize, Sequelize)

// user
db.faculty.hasMany(db.user)
db.user.belongsTo(db.faculty)
// partner
db.country.hasMany(db.partner)
db.partner.belongsTo(db.country)
// main_cooperation
db.cooperation.hasMany(db.main_cooperation)
db.main_cooperation.belongsTo(db.cooperation)
// user_partner
db.partner.hasMany(db.user_partner)
db.user_partner.belongsTo(db.partner)
// cooperation
db.partner.hasMany(db.cooperation)
db.cooperation.belongsTo(db.partner)
db.user.hasMany(db.cooperation)
db.cooperation.belongsTo(db.user)
// member_sign
db.faculty.hasMany(db.member_sign)
db.member_sign.belongsTo(db.faculty)
// Belong To many 1
db.cooperation.belongsToMany(db.faculty, { through: db.coo_faculty, foreignKey: 'cooperationId', otherKey: 'facultyId' })
db.faculty.belongsToMany(db.cooperation, { through: db.coo_faculty, foreignKey: 'facultyId', otherKey: 'cooperationId' })
// Belong To many 2
db.cooperation.belongsToMany(db.user_partner, { through: db.coo_partner, foreignKey: 'cooperationId', otherKey: 'user_partnerId' })
db.user_partner.belongsToMany(db.cooperation, { through: db.coo_partner, foreignKey: 'user_partnerId', otherKey: 'cooperationId' })
// Belong To mana 3
db.cooperation.belongsToMany(db.member_sign, { through: db.coo_member, foreignKey: 'cooperationId', otherKey: 'member_signId' })
db.member_sign.belongsToMany(db.cooperation, { through: db.coo_member, foreignKey: 'member_signId', otherKey: 'cooperationId' })

module.exports = db