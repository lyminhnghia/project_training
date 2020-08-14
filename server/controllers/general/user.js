const jwt       = require('jsonwebtoken')
const bcrypt    = require('bcryptjs')
const db        = require('../../configs/db.config')
const config    = require('../../configs/config')

const User = db.user

exports.login = (req, res) => {
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(users => {
		if (!users) {
			return res.status(403).send({success: false, message:"Username does not exist!"})
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, users.password)
		if (!passwordIsValid) {
			return res.status(403).send({success: false, message:"Password incorrect!"});
		}
		
		let JwtToken = jwt.sign({ id: users.id }, config.secret, {
		  	expiresIn: 86400 // token hết hạn sau 24 giờ
		});

		res.status(200).send({success : true, message: JwtToken, role: users.role})
		
	}).catch(error => {
		res.status(500).send({success: false, message: error.message})
	})
}

exports.editPassword = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        },
    }).then(user => {
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordIsValid) {
            return res.status(403).send({success: false, message: 'Password invalid!'});
		}
		User.update({
            password: bcrypt.hashSync(req.body.newpassword, 8)
        }, {
            where: {
				id: req.userId
			}
        }).then(() => res.status(200).send({success: true, message: 'Update password successful!'})
        ).catch(error => {
            res.status(500).send({success: false, message: error.message})
        })
    }).catch(error => {
        res.status(500).send({success: false, message: error.message})
	})
}

exports.userProfile = (req, res) => {
	User.findOne({
		where: {
			id: req.userId
		},
		attributes: ['id', 'username', 'role', 'facultyId']
	}).then(user => {
		res.status(200).send({success: true, message: user})
	}).catch(error => {
		res.status(500).send({success: false, message: error.message})
	})
}