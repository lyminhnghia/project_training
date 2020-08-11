const db = require('../../configs/db.config')
const PartnerSign = db.user_partner
const Partner = db.partner

exports.createPartnerSign = (req, res) => {
    if (!req.body.fullname) {
        return res.status(403).send({success: false, message: 'Required input Full Name!'})
    }
    PartnerSign.findOne({
        where: {
            fullname:   req.body.fullname,
            partnerId:  req.body.partnerId
        }
    }).then(partnerSign => {
        if (partnerSign) {
            return res.status(403).send({success: false, message: 'Partner Sign already exists!'})
        }
        PartnerSign.create({
            fullname:       req.body.fullname,
            date_of_birth:  req.body.date_of_birth,
            email:          req.body.email,
            address:        req.body.address,
            job_title:      req.body.job_title,
            partnerId:      req.body.partnerId
        }).then(() => {
            res.status(200).send({success: true, message: 'Created successful!'})
        }).catch(error => {
            res.status(500).send({success: false, message: error.message})
        })
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.updatePartnerSign = (req, res) => {
    if (!req.body.fullname) {
        return res.status(403).send({success: false, message: 'Required input Full Name!'})
    }
    PartnerSign.findOne({
        where: {
            fullname:   req.body.fullname,
            partnerId:  req.body.partnerId
        }
    }).then(partnerSign => {
        if (partnerSign && partnerSign.id != req.params.id) {
            return res.status(403).send({success: false, message: 'Partner Sign already exists!'})
        }
        PartnerSign.update({
            fullname:       req.body.fullname,
            date_of_birth:  req.body.date_of_birth,
            email:          req.body.email,
            address:        req.body.address,
            job_title:      req.body.job_title,
            partnerId:      req.body.partnerId
        }, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.status(200).send({success: true, message: 'Updated successful!'})
        }).catch(error => {
            res.status(500).send({success: false, message: error.message})
        })
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.readAllPartnerSign = (req, res) => {
    page = parseInt(req.query.page)
    limit = 10
    PartnerSign.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        include:[{
            model: Partner,
            attributes: ['name']
        }]
    }).then(partnerSign => {
        res.status(200).send({success: true, total: partnerSign.count, message: partnerSign.rows})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.readPartnerSign = (req, res) => {
    PartnerSign.findOne({
        where: {
            id: req.params.id
        }
    }).then(partnerSign => {
        if (!partnerSign) {
            return res.status(403).send({success: false, message: 'Partner Sign does not exists!'})    
        }
        res.status(200).send({success: true, message: partnerSign})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.deletePartnerSign = (req, res) => {
    PartnerSign.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).send({success: true, message: 'Deleted successful!'})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}