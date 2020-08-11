module.exports = (sequelize, Sequelize) => {
    const userPartner = sequelize.define('user_partners', {
        fullname:       Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        date_of_birth:  Sequelize.DATEONLY,
        email:          Sequelize.STRING,
        address:        Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        job_title:      Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci'
    })
    return userPartner
}