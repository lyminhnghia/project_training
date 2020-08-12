const db = require('../../configs/db.config')
const User = db.user
const Cooperation = db.cooperation
const Main = db.main_cooperation
const Partner = db.partner
const Op = db.Sequelize.Op
const moment = require('moment')

exports.notifyCooperationExpire = async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                id: req.userId
            }
        })
        if (user.role == 'admin') {
            let coop = await Cooperation.findAll({
                attributes: ['id', 'expiry_date'],
                where: {
                    expiry_date: {
                        [Op.lte]: moment().add(7, 'days').toDate()
                    }
                },
                include: [{
                    model: Partner,
                    attributes: ['name']
                }, {
                    model: Main,
                    attributes: ['main_cooperation']
                }]
            })
            res.status(200).send({success: true, message: coop})
        } else {
            let coop = await Cooperation.findAll({
                attributes: ['id', 'expiry_date'],
                where: {
                    expiry_date: {
                        [Op.lte]: moment().add(7, 'days').toDate()
                    },
                    accountId: req.userId
                },
                include: [{
                    model: Partner,
                    attributes: ['name']
                }, {
                    model: Main,
                    attributes: ['main_cooperation']
                }]
            })
            res.status(200).send({success: true, message: coop})
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}