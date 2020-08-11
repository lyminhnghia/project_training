const db = require('../../configs/db.config')
const bcrypt    = require('bcryptjs')
const User = db.user
const Faculty = db.faculty

exports.CreateFaculty = (req, res) => {
    if (!req.body.name) {
        return res.status(403).send({success: false, message: "Required Name Faculty!"})
    }
    Faculty.findOne({
        where: {
            name: req.body.name
        }
    }).then(faculty => {
        if (faculty) {
            return res.status(403).send({success: false, message: 'Faculty already exists!'})
        }
        Faculty.create({
            name:           req.body.name,
            abbreviation:   req.body.abbreviation,
            founding_date:  req.body.founding_date,
            phone:          req.body.phone,
            address:        req.body.address,
            email:          req.body.email,
            website:        req.body.website
        }).then(() => {
            res.status(200).send({success: true, message: 'Created successful!'})
        }).catch(error => {
            res.status(500).send({success: false, message: error.message})
        })
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.UpdateFaculty = (req, res) => {
    if (!req.body.name) {
        return res.status(403).send({success: false, message: "Required Name Faculty!"})
    }
    Faculty.findOne({
        where: {
            name: req.body.name
        }
    }).then(faculty => {
        if (faculty && faculty.id != req.params.id) {
            return res.status(403).send({success: false, message: 'Faculty already exists!'})
        }
        Faculty.update({
            name:           req.body.name,
            abbreviation:   req.body.abbreviation,
            founding_date:  req.body.founding_date,
            phone:          req.body.phone,
            address:        req.body.address,
            email:          req.body.email,
            website:        req.body.website
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

exports.ReadAllNameFaculty = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        if (user.role == 'admin') {
            Faculty.findAll({
                attributes: ['id', 'name']
            }).then(faculty => {
                res.status(200).send({success: true, message: faculty})
            }).catch(error => {
                res.status(500).send({success: false, message: error.message})
            })
        } else {
            Faculty.findAll({
                where: {
                    id: user.facultyId
                },
                attributes: ['id', 'name']
            }).then(faculty => {
                res.status(200).send({success: true, message: faculty})
            }).catch(error => {
                res.status(500).send({success: false, message: error.message})
            })
        }
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.ReadAllFaculty = (req, res) => {
    page = parseInt(req.query.page)
    limit = 10
    Faculty.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit
    }).then(faculty => {
        res.status(200).send({success: true, total: faculty.count, message: faculty.rows})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.ReadFaculty = (req, res) => {
    Faculty.findOne({
        where: {
            id: req.params.id
        }
    }).then(faculty => {
        if (!faculty) {
            return res.status(403).send({success: false, message: 'Faculty does not exists!'})    
        }
        res.status(200).send({success: true, message: faculty})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.DeleteFaculty = (req, res) => {
    Faculty.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).send({success: true, message: 'Deleted successful!'})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.CreateUserFaculty = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            return res.status(403).send({success: false, message: 'User already exists!'})
        }
        User.create({
            username:       req.body.username,
            password:       bcrypt.hashSync(req.body.password, 8),
            role:           "faculty",
            mail:           req.body.email,
            facultyId:      req.body.facultyId
        }).then(() => {
            res.status(200).send({success: true, message: 'Created successful!'})
        }).catch(error => {
            res.status(500).send({success: false, message: error.message})
        })
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.UpdateUserFaculty = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user && user.id != req.params.id) {
            return res.status(403).send({success: false, message: 'User already exists!'})
        }
        User.update({
            username:       req.body.username,
            mail:           req.body.email,
            facultyId:   req.body.facultyId
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

exports.ReadAllUserFaculty = (req, res) => {
    page = parseInt(req.query.page)
    limit = 10
    User.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        where: {
            role: "faculty"
        },
        attributes: ['id','username', 'mail'],
        include:[{
            model: Faculty,
            attributes: ['name']
        }]
    }).then(user => {
        res.status(200).send({success: true, total: user.count, message: user.rows})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.ReadUserFaculty = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','username', 'mail', 'facultyId'],
    }).then(user => {
        if (!user) {
            return res.status(403).send({success: false, message: 'User does not exists!'})    
        }
        res.status(200).send({success: true, message: user})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.DeleteUserFaculty = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).send({success: true, message: 'Deleted successful!'})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}