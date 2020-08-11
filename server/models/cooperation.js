module.exports = (sequelize, Sequelize) => {
    const Cooperation = sequelize.define('cooperations', {
        note:               Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        renew:              Sequelize.BOOLEAN,
        contract_value:     Sequelize.STRING,
        sign_date:          Sequelize.DATEONLY,
        expiry_date:        Sequelize.DATEONLY,
        file:               Sequelize.STRING
    })
    return Cooperation
}