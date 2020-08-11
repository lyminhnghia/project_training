module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('accounts', {
        username:   Sequelize.STRING,
        password:   Sequelize.STRING,
        role:       Sequelize.STRING,
        mail:       Sequelize.STRING
    })
    return User
}