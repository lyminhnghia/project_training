module.exports = (sequelize, Sequelize) => {
    const CooperationFaculty = sequelize.define('cooperation_faculties', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        }    
    })
    return CooperationFaculty
}