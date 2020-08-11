module.exports = (sequelize, Sequelize) => {
    const CooperationMember = sequelize.define('member_sign_cooperations', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        }    
    })
    return CooperationMember
}