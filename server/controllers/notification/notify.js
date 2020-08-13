const db = require('../../configs/db.config')
const User = db.user
const Cooperation = db.cooperation
const Main = db.main_cooperation
const Partner = db.partner
const Op = db.Sequelize.Op
const moment = require('moment')
const nodemailer = require('nodemailer')

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
                    },
                    renew: true
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
                    accountId: req.userId,
                    renew: true
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

exports.sendEmail = async () => {
    const user = await User.findOne({
        attributes: ['mail'],
        where: {
            role: 'admin'
        }
    })

    var partner = await Partner.findAll({
        attributes: ['name', 'founding_date'],
        where: {
            founding_date: {
                [Op.lte]: moment().add(7, 'days').toDate()
            }
        }
    })

    var transport = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hoithanhnienvandonghienmau@gmail.com',
            pass: 'hoimauhanoi1994@'
        }
    })
    
    for (let i in partner) {
        var countDate = moment(partner[i].founding_date).diff(Date.now(), 'day') + 1
        var year = moment(partner[i].founding_date).get('year')
        var yearNow = moment(Date.now()).get('year')
        if (countDate < 0) {
            countDate = countDate + 365 * (yearNow - year)
        }
        if (countDate <= 7) {
            var mailOptions = {
                from: 'me',
                to: user.mail,
                subject: `Sinh nhật đối tác ${partner[i].name}`,
                text: `Chỉ còn ${countDate} ngày nữa là  tới ngày thành lập ${partner[i].name} hãy gửi lời chúc mừng tới họ!!!`
            }
              
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId)
            })
        }
    }
}