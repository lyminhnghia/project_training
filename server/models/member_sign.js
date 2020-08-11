module.exports = (sequelize, Sequelize) => {
    const Sign = sequelize.define('member_signs', {
        fullname:       Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        email:          Sequelize.STRING,
        phone:          Sequelize.STRING,
        job_title:      Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci'
    })
    return Sign
}