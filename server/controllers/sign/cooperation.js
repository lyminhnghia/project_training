const db = require('../../configs/db.config')
const fs = require('fs')
const path = require('path')
const Cooperation = db.cooperation
const MemberSign = db.member_sign
const PartnerSign = db.user_partner
const Partner = db.partner
const Faculty = db.faculty
const User = db.user
const Main = db.main_cooperation
const CooFaculty = db.coo_faculty
const CooMember = db.coo_member
const CooPartner = db.coo_partner
const Op = db.Sequelize.Op

exports.createCooperation = async (req, res) => {
    if (!req.body.user_partners) {
        return res.status(403).send({success: false, message: "Required partner sign!"})
    }
    if (!req.body.member_signs) {
        return res.status(403).send({success: false, message: "Required member sign!"})
    }
    if (req.body.expiry_date - req.body.sign_date < 0) {
        return res.status(403).send({success: false, message: "Required sign date <= expiry date!"})
    }

    partner = req.body.user_partners
    member = req.body.member_signs
    faculty = req.body.faculties

    try {
        const cooperation = await Cooperation.create({
            note: req.body.note,
            renew: req.body.renew,
            contract_value: req.body.contract_value,
            sign_date: req.body.sign_date,
            expiry_date: req.body.expiry_date,
            partnerId: req.body.partnerId,
            accountId: req.userId 
        })
        main = req.body.main_cooperation.split('-')
        for (i in faculty) {
            Main.create({
                main_cooperation: main[i],
                cooperationId: cooperation.id
            })
        }
        if (faculty) {
            for (i in faculty) {
                CooFaculty.create({
                    facultyId: faculty[i],
                    cooperationId: cooperation.id
                })
            }
        }
        for (i in partner) {
            CooPartner.create({
                user_partnerId: partner[i],
                cooperationId: cooperation.id
            })
        }
        for (i in member) {
            CooMember.create({
                member_signId: member[i],
                cooperationId: cooperation.id
            })
        }
        await res.status(200).send({success: true, message: 'Created successful!'})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

exports.updateCooperation = async (req, res) => {
    if (!req.body.user_partners) {
        return res.status(403).send({success: false, message: "Required partner sign!"})
    }
    if (!req.body.member_signs) {
        return res.status(403).send({success: false, message: "Required member sign!"})
    }
    if (req.body.expiry_date - req.body.sign_date < 0) {
        return res.status(403).send({success: false, message: "Required sign date <= expiry date!"})
    }

    partner = req.body.user_partners
    member = req.body.member_signs
    faculty = req.body.faculties
    cooId = req.params.id

    try {
        await Cooperation.update({
            note: req.body.note,
            renew: req.body.renew,
            contract_value: req.body.contract_value,
            sign_date: req.body.sign_date,
            expiry_date: req.body.expiry_date,
            partnerId: req.body.partnerId
        }, {
            where: {
                id: cooId
            }
        })
        main = req.body.main_cooperation.split('-')
        await Main.destroy({
            where: {
                cooperationId: cooId
            }
        })
        for (i in main) {
            Main.create({
                main_cooperation: main[i],
                cooperationId: cooId
            })
        }
        if (faculty) {
            await CooFaculty.destroy({
                where: {
                    cooperationId: cooId
                }
            })
            for (i in faculty) {
                CooFaculty.create({
                    facultyId: faculty[i],
                    cooperationId: cooId
                })
            }
        }
        await CooPartner.destroy({
            where: {
                cooperationId: cooId
            }
        })
        for (i in partner) {
            CooPartner.create({
                user_partnerId: partner[i],
                cooperationId: cooId
            })
        }
        await CooMember.destroy({
            where: {
                cooperationId: cooId
            }
        })
        for (i in member) {
            CooMember.create({
                member_signId: member[i],
                cooperationId: cooId
            })
        }
        await res.status(200).send({success: true, message: 'Updated successful!'})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

exports.readAllPartner = async (req, res) => {
    try {
        const partner = await Partner.findAll({
            attributes: ['id', 'name'],
            include: [{
                model: PartnerSign,
                attributes: ['id', 'fullname']
            }]
        })
        res.status(200).send({success: true, message: partner})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

exports.readAllFaculty =  async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId
            }
        })
        if (user.role === 'admin') {
            let faculty = await Faculty.findAll({
                attributes: ['id', 'name'],
                include: [{
                    model: MemberSign,
                    attributes: ['id', 'fullname']
                }]
            })
            res.status(200).send({success: true, message: faculty})
        } else {
            let faculty = await Faculty.findAll({
                where: {
                    id: user.facultyId
                },
                attributes: ['id', 'name'],
                include: [{
                    model: MemberSign,
                    attributes: ['id', 'fullname']
                }]
            })
            res.status(200).send({success: true, message: faculty})
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

exports.ReadAllNameFacultyUser = (req, res) => {
    Faculty.findAll({
        attributes: ['id', 'name']
    }).then(faculty => {
        res.status(200).send({success: true, message: faculty})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
    })
}

exports.readAllMyCooperation = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId
            }
        })
        if (user.role == 'admin') {
            let coop = await Cooperation.findAll({
                attributes: ['id', 'note', 'renew', 'sign_date', 'expiry_date', 'file'],
                include: [{
                    model: User,
                    attributes: ['facultyId']
                }, {
                    model: Partner,
                    attributes: ['name']
                }, {
                    model: Faculty,
                    attributes: ['name']
                }, {
                    model: MemberSign,
                    attributes: ['fullname']
                }, {
                    model: PartnerSign,
                    attributes: ['fullname']
                }, {
                    model: Main,
                    attributes: ['main_cooperation']
                }] 
            })
            res.status(200).send({success: true, total: Object.keys(coop).length, message: coop})
        } else {
            let myCoop = await Cooperation.findAll({
                where: {
                    accountId: req.userId
                },
                attributes: ['id', 'note', 'renew', 'sign_date', 'expiry_date', 'file'],
                include: [{
                    model: User,
                    attributes: ['facultyId']
                }, {
                    model: Partner,
                    attributes: ['name']
                }, {
                    model: Faculty,
                    attributes: ['name']
                }, {
                    model: MemberSign,
                    attributes: ['fullname']
                }, {
                    model: PartnerSign,
                    attributes: ['fullname']
                }, {
                    model: Main,
                    attributes: ['main_cooperation']
                }] 
            })
            let shareCoop = await Faculty.findOne({
                where: {
                    id: user.facultyId
                },
                include: [{
                    model: Cooperation,
                    where: {
                        accountId: {
                            [Op.ne]: req.userId
                        }
                    },
                    attributes: ['sign_date', 'expiry_date', 'renew'],
                    include: [{
                        model: MemberSign,
                        attributes: ['fullname']
                    }, {
                        model: PartnerSign,
                        attributes: ['fullname']
                    }, {
                        model: Main,
                        attributes: ['main_cooperation']
                    }]
                }]
            })
            let send = shareCoop.cooperations
            res.status(200).send({success: true, total: Object.keys(myCoop).length, message: myCoop, totalData: Object.keys(send).length, data: send})
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

exports.readCooperation = async (req, res) => {
    try {
        let coop = await Cooperation.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'note', 'renew', 'contract_value', 'sign_date', 'expiry_date', 'file', 'partnerId'],
            include: [{
                model: Faculty,
                attributes: ['id', 'name']
            }, {
                model: MemberSign,
                attributes: ['id', 'fullname']
            }, {
                model: PartnerSign,
                attributes: ['id', 'fullname']
            }, {
                model: Main,
                attributes: ['main_cooperation']
            }] 
        })
        res.status(200).send({success: true, message: coop})
    } catch (error) {
        res.status(500).send({success: false, message: error.message})
    }
}

exports.UploadFile = (req, res) => {
    if (!req.file) {
        return res.status(200).send({success: true})
    }
    const processedFile = req.file || {}
    let orgName = processedFile.originalname || ''
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path
    const newFullPath = `${fullPathInServ}-${orgName}`
    fs.renameSync(fullPathInServ, newFullPath);

    var fileString = path.basename(newFullPath)
    var filePath = `http://localhost:5000/api/upload/` + fileString

    res.status(200).send({success : true, file: filePath})
}