const db = require('../../configs/db.config')
const Member = db.member_sign
const Faculty = db.faculty
const User = db.user

exports.createMemberSign = (req, res) => {
    if (!req.body.fullname) {
        return res.status(403).send({success: false, message: 'Required input Full Name!'})
    }
    if (!req.body.facultyId) {
        return res.status(403).send({success: false, message: 'Required input Faculty!'})
    }
    Member.findOne({
        where: {
            fullname:   req.body.fullname,
            facultyId:  req.body.facultyId
        }
    }).then(member => {
        if (member) {
            return res.status(403).send({success: false, message: 'Member Sign already exists!'})
        }
        Member.create({
            fullname:   req.body.fullname,
            email:      req.body.email,
            phone:      req.body.phone,
            job_title:  req.body.job_title,
            facultyId:  req.body.facultyId
        }).then(() => {
            res.status(200).send({success: true, message: 'Created successful!'})
        }).catch(error => {
            res.status(500).send({success: false, message: error.message})
        })
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.updateMemberSign = (req, res) => {
    if (!req.body.fullname) {
        return res.status(403).send({success: false, message: 'Required input Full Name!'})
    }
    if (!req.body.facultyId) {
        return res.status(403).send({success: false, message: 'Required input Faculty!'})
    }
    Member.findOne({
        where: {
            fullname:   req.body.fullname,
            facultyId:  req.body.facultyId
        }
    }).then(member => {
        if (member && member.id != req.params.id) {
            return res.status(403).send({success: false, message: 'Member Sign already exists!'})
        }
        Member.update({
            fullname:   req.body.fullname,
            email:      req.body.email,
            phone:      req.body.phone,
            job_title:  req.body.job_title,
            facultyId:  req.body.facultyId
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

exports.readAllMemberSign = (req, res) => {
    page = parseInt(req.query.page)
    limit = 10
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        if (user.role == 'admin') {
            Member.findAndCountAll({
                limit: limit,
                offset: (page - 1) * limit,
                include: [{
                    model: Faculty,
                    attributes: ['name']
                }]
            }).then(member => {
                res.status(200).send({success: true, total: member.count, message: member.rows})
            }).catch(error => {
                res.status(500).send({success: false, message: error.message})
            })
        } else {
            Member.findAndCountAll({
                limit: limit,
                offset: (page - 1) * limit,
                where: {
                    facultyId: user.facultyId
                },
                include: [{
                    model: Faculty,
                    attributes: ['name']
                }]
            }).then(member => {
                res.status(200).send({success: true, total: member.count, message: member.rows})
            }).catch(error => {
                res.status(500).send({success: false, message: error.message})
            })
        }
    })
}

exports.readAllNameMemberSign = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        if (user.role == 'admin') {
            Member.findAll({
                attributes: ['id', 'fullname']
            }).then(member => {
                res.status(200).send({success: true, message: member})
            }).catch(error => {
                res.status(500).send({success: false, message: error.message})
            })
        } else {
            Member.findAll({
                where: {
                    facultyId: user.facultyId
                },
                attributes: ['id', 'fullname']
            }).then(member => {
                res.status(200).send({success: true, message: member})
            }).catch(error => {
                res.status(500).send({success: false, message: error.message})
            })
        }
    })
}

exports.readMemberSign = (req, res) => {
    Member.findOne({
        where: {
            id: req.params.id
        }
    }).then(member => {
        if (!member) {
            return res.status(403).send({success: false, message: 'Member Sign does not exists!'})    
        }
        res.status(200).send({success: true, message: member})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.deleteMemberSign = (req, res) => {
    Member.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).send({success: true, message: 'Deleted successful!'})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}