const db = require('../../configs/db.config')
const Country = db.country

exports.createCountry = (req, res) => {
    if (!req.body.country) {
        return res.status(403).send({success: false, message: 'Required input country!'})
    }
    Country.findOne({
        where: {
            country: req.body.country
        }        
    }).then(country => {
        if (country) {
            return res.status(403).send({success: false, message: 'Country already exists!'})
        }
        Country.create({
            country:    req.body.country,
            continent:  req.body.continent
        }).then(() => {
            res.status(200).send({success: true, message: 'Created country successful!'})
        }).catch(error => {
            res.status(500).send({success: false, message: error.message})
        })
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.updateCountry = (req, res) => {
    if (!req.body.country) {
        return res.status(403).send({success: false, message: 'Required input country!'})
    }
    Country.findOne({
        where: {
            country: req.body.country
        }        
    }).then(country => {
        if (country && country.id != req.params.id) {
            return res.status(403).send({success: false, message: 'Country already exists!'})
        }
        Country.update({
            country:    req.body.country,
            continent:  req.body.continent
        }, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.status(200).send({success: true, message: 'Updated country successful!'})
        }).catch(error => {
            res.status(500).send({success: false, message: error.message})
        })
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.readAllCountry = (req, res) => {
    page = parseInt(req.query.page)
    limit = 10
    Country.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        attributes: ['id', 'country', 'continent']
    }).then(country => {
        res.status(200).send({success: true, total: country.count, message: country.rows})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.readAllNameCountry = (req, res) => {
    Country.findAll({
        attributes: ['id', 'country']
    }).then(country => {
        res.status(200).send({success: true, message: country})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.readCountry = (req, res) => {
    Country.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'country', 'continent']
    }).then(country => {
        if (!country) {
            return res.status(403).send({success: false, message: 'Country does not exists!'})    
        }
        res.status(200).send({success: true, message: country})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.deleteCountry = (req, res) => {
    Country.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).send({success: true, message: 'Deleted successful!'})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}