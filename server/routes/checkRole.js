const db = require('../configs/db.config')
const User = db.user

isAdmin = (req, res, next) => {
	User.findOne({
		where: {
			id: req.userId
		}
	}).then(user => {
		if (user.role === "admin") {
			next()
			return
		}
		res.status(401).send({success: false, message:"Require Role Admin!"})
	}).catch(error => {
		res.status(500).send({success: false, message: error.message})
	})
}

const checkRole = {}

checkRole.isAdmin = isAdmin

module.exports = checkRole