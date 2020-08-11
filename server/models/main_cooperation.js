module.exports = (sequelize, Sequelize) => {
    const Main = sequelize.define('main_cooperations', {
        main_cooperation:       Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        specific_cooperation:   Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        expense:                Sequelize.INTEGER
    })
    return Main
}