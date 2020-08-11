const db = require('../../configs/db.config')
const Partner = db.partner
const Country = db.country

exports.createPartner = (req, res) => {
    if (!req.body.name) {
        return res.status(403).send({success: false, message: 'Required input partner name!'})
    }
    Partner.findOne({
        where: {
            name: req.body.name
        }        
    }).then(partner => {
        if (partner) {
            return res.status(403).send({success: false, message: 'Partner name already exists!'})
        }
        Partner.create({
            name:           req.body.name,
            abbreviation:   req.body.abbreviation,
            president:      req.body.president,
            founding_date:  req.body.founding_date,
            phone:          req.body.phone,
            address:        req.body.address,
            email:          req.body.email,
            website:        req.body.website,
            countryId:      req.body.countryId
        }).then(() => {
            res.status(200).send({success: true, message: 'Created partner successful!'})
        }).catch(error => {
            res.status(500).send({success: false, message: error.message})
        })
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.updatePartner = (req, res) => {
    if (!req.body.name) {
        return res.status(403).send({success: false, message: 'Required input partner name!'})
    }
    Partner.findOne({
        where: {
            name: req.body.name
        }        
    }).then(partner => {
        if (partner && partner.id != req.params.id) {
            return res.status(403).send({success: false, message: 'Partner name already exists!'})
        }
        Partner.update({
            name:           req.body.name,
            abbreviation:   req.body.abbreviation,
            president:      req.body.president,
            founding_date:  req.body.founding_date,
            phone:          req.body.phone,
            address:        req.body.address,
            email:          req.body.email,
            website:        req.body.website,
            countryId:      req.body.countryId
        }, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.status(200).send({success: true, message: 'Updated partner successful!'})
        }).catch(error => {
            res.status(500).send({success: false, message: error.message})
        })
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.readAllPartner = (req, res) => {
    page = parseInt(req.query.page)
    limit = 10
    Partner.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        include:[{
            model: Country
        }]
    }).then(partner => {
        res.status(200).send({success: true, total: partner.count, message: partner.rows})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.readAllNamePartner = (req, res) => {
    Partner.findAndCountAll({
        attributes: ['id', 'name']
    }).then(partner => {
        res.status(200).send({success: true, total: partner.count, message: partner.rows})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.readPartner = (req, res) => {
    Partner.findOne({
        where: {
            id: req.params.id
        }
    }).then(partner => {
        if (!partner) {
            return res.status(403).send({success: false, message: 'Partner does not exists!'})    
        }
        res.status(200).send({success: true, message: partner})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.deletePartner = (req, res) => {
    Partner.destroy({
        where: {
            id: req.params.id
        } 
    }).then(() => {
        res.status(200).send({success: true, message: 'Deleted successful!'})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    }) 
}