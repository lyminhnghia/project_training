module.exports = (sequelize, Sequelize) => {
    const CooperationPartner = sequelize.define('user_partner_cooperations', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        }    
    })
    return CooperationPartner
}