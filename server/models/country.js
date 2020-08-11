module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define('countries', {
        country:        Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        continent:      Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci'
    })
    return Country
}