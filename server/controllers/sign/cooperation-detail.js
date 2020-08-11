const db = require('../../configs/db.config')
const Main = db.main_cooperation
const Cooperation = db.cooperation
const User = db.user

exports.updateMainCooperation = async (req, res) => {
    try {
        await Main.update({
            specific_cooperation: req.body.specific_cooperation,   
            expense: req.body.expense
        }, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({success: true, message: 'Updated successful!'})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

exports.readAllMainCooperation = async (req, res) => {
    page = parseInt(req.query.page)
    limit = 10
    try {
        const user = await User.findOne({
            where: {
                id: req.userId
            }
        })
        if (user.role == 'admin') {
            let main = await Main.findAndCountAll({
                limit: limit,
                offset: (page - 1) * limit
            })
            res.status(200).send({success: true, total: main.count, message: main.rows})
        } else {
            let coop = await Main.findAndCountAll({
                limit: limit,
                offset: (page - 1) * limit,
                include: [{
                    model: Cooperation,
                    attributes: ['id'],
                    where: {
                        accountId: req.userId
                    }
                }]
            })
            await res.status(200).send({success: true, total: coop.count, message: coop.rows})
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

exports.readMainCooperation = async (req, res) => {
    try {
        const main = await Main.findOne({
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({success: true, message: main})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}