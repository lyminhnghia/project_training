module.exports = (app) => {
    const checkRole             =       require('./checkRole')
    const authJwt               =       require('./verifyJwtToken')
    const user                  =       require('../controllers/general/user')
    const admin                 =       require('../controllers/admin/managerFaculty')
    const admin_country         =       require('../controllers/admin/country')
    const member_sign           =       require('../controllers/general/member_sign')
    const partner               =       require('../controllers/general/partner')
    const partner_sign          =       require('../controllers/general/partner_sign')
    const cooperation           =       require('../controllers/sign/cooperation')
    const cooperation_detail    =       require('../controllers/sign/cooperation-detail')
    const notify                =       require('../controllers/notification/notify')
    const multer                =       require('multer')
    const path                  =       require('path')
    const fileUpload            =       multer({dest: 'upload/'})

    // general
    app.post('/api/login', [authJwt.checkUsername, authJwt.checkPassword], user.login)
    app.put('/api/password/edit', [authJwt.verifyToken, authJwt.checkPasswordEdit], user.editPassword)
    app.get('/api/profile', [authJwt.verifyToken], user.userProfile)
    // role admin managerment: faculty
    app.post('/api/faculty/add', [authJwt.verifyToken, checkRole.isAdmin], admin.CreateFaculty)
    app.put('/api/faculty/:id', [authJwt.verifyToken, checkRole.isAdmin], admin.UpdateFaculty)
    app.get('/api/faculty/all', [authJwt.verifyToken, checkRole.isAdmin], admin.ReadAllFaculty)
    app.get('/api/faculty/:id', [authJwt.verifyToken, checkRole.isAdmin], admin.ReadFaculty)
    app.delete('/api/faculty/:id', [authJwt.verifyToken, checkRole.isAdmin], admin.DeleteFaculty)
    // general: faculty Name
    app.get('/api/faculty/name/all', [authJwt.verifyToken], admin.ReadAllNameFaculty)
    // role admin managerment: user faculty
    app.post('/api/user/faculty/add', [authJwt.verifyToken, checkRole.isAdmin, authJwt.checkPassword, authJwt.checkUsername], admin.CreateUserFaculty)
    app.put('/api/user/faculty/:id', [authJwt.verifyToken, checkRole.isAdmin, authJwt.checkUsername], admin.UpdateUserFaculty)
    app.get('/api/user/faculty/all', [authJwt.verifyToken, checkRole.isAdmin], admin.ReadAllUserFaculty)
    app.get('/api/user/faculty/:id', [authJwt.verifyToken, checkRole.isAdmin], admin.ReadUserFaculty)
    app.delete('/api/user/faculty/:id', [authJwt.verifyToken, checkRole.isAdmin], admin.DeleteUserFaculty)
    // role admin: country
    app.post('/api/country/add', [authJwt.verifyToken, checkRole.isAdmin], admin_country.createCountry)
    app.put('/api/country/:id', [authJwt.verifyToken, checkRole.isAdmin], admin_country.updateCountry)
    app.get('/api/country/all', [authJwt.verifyToken, checkRole.isAdmin], admin_country.readAllCountry)
    app.get('/api/country/:id', [authJwt.verifyToken, checkRole.isAdmin], admin_country.readCountry)
    app.delete('/api/country/:id', [authJwt.verifyToken, checkRole.isAdmin], admin_country.deleteCountry)
    // general: country
    app.get('/api/country/name/all', [authJwt.verifyToken], admin_country.readAllNameCountry)
    // general: member_sign
    app.post('/api/member/sign/add', [authJwt.verifyToken], member_sign.createMemberSign)
    app.put('/api/member/sign/:id', [authJwt.verifyToken], member_sign.updateMemberSign)
    app.get('/api/member/sign/all', [authJwt.verifyToken], member_sign.readAllMemberSign)
    app.get('/api/member/sign/name/all', [authJwt.verifyToken], member_sign.readAllNameMemberSign)
    app.get('/api/member/sign/:id', [authJwt.verifyToken], member_sign.readMemberSign)
    app.delete('/api/member/sign/:id', [authJwt.verifyToken], member_sign.deleteMemberSign)
    // general: partner
    app.post('/api/partner/add', [authJwt.verifyToken], partner.createPartner)
    app.put('/api/partner/:id', [authJwt.verifyToken], partner.updatePartner)
    app.get('/api/partner/all', [authJwt.verifyToken], partner.readAllPartner)
    app.get('/api/partner/name/all', [authJwt.verifyToken], partner.readAllNamePartner)
    app.get('/api/partner/:id', [authJwt.verifyToken], partner.readPartner)
    app.delete('/api/partner/:id', [authJwt.verifyToken], partner.deletePartner)
    // general: parner_sign
    app.post('/api/partner/sign/add', [authJwt.verifyToken], partner_sign.createPartnerSign)
    app.put('/api/partner/sign/:id', [authJwt.verifyToken], partner_sign.updatePartnerSign)
    app.get('/api/partner/sign/all', [authJwt.verifyToken], partner_sign.readAllPartnerSign)
    app.get('/api/partner/sign/:id', [authJwt.verifyToken], partner_sign.readPartnerSign)
    app.delete('/api/partner/sign/:id', [authJwt.verifyToken], partner_sign.deletePartnerSign)
    // sign: cooperation
    app.post('/api/cooperation/add', [authJwt.verifyToken], cooperation.createCooperation)
    app.put('/api/cooperation/:id', [authJwt.verifyToken], cooperation.updateCooperation)
    app.get('/api/cooperation/:id', [authJwt.verifyToken], cooperation.readCooperation)
    app.get('/api/cooperation/partner/all', [authJwt.verifyToken], cooperation.readAllPartner)
    app.get('/api/cooperation/faculty/all', [authJwt.verifyToken], cooperation.readAllFaculty)
    app.get('/api/mycooperation/all', [authJwt.verifyToken], cooperation.readAllMyCooperation)
    app.get('/api/user/faculty/name/all', [authJwt.verifyToken], cooperation.ReadAllNameFacultyUser)

    app.post('/api/upload/file', [fileUpload.single('file'), authJwt.verifyToken], cooperation.UploadFile)

    app.get('/api/file/:name', (req, res) => {
		const fileName = req.params.name
      if (!fileName) {
        return res.status(500).send({
          status: false,
          message: 'no filename specified',
        })
      }
      res.status(200).sendFile(path.resolve(`./upload/${fileName}`))
    })
    // sign: cooperation-detail
    app.put('/api/cooperation/main/:id', [authJwt.verifyToken], cooperation_detail.updateMainCooperation)
    app.get('/api/cooperation/main/all', [authJwt.verifyToken], cooperation_detail.readAllMainCooperation)
    app.get('/api/cooperation/main/:id', [authJwt.verifyToken], cooperation_detail.readMainCooperation)
    // notify
    app.get('/api/notify/cooperation', [authJwt.verifyToken], notify.notifyCooperationExpire)
    const interval = () => {
        notify.sendEmail()
    }
      
    setInterval(interval, 1000 * 60 * 60 * 24)
}