module.exports = (sequelize, Sequelize) => {
    const Faculty = sequelize.define('faculties', {
        name:           Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',   // Tên khoa
        abbreviation:   Sequelize.STRING,                                           // Tên viết tắt khoa
        founding_date:  Sequelize.DATEONLY,                                         // Ngày thành lập khoa
        phone:          Sequelize.STRING,                                           // Điện thoại
        address:        Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',   // Địa chỉ
        email:          Sequelize.STRING,                                           // email khoa
        website:        Sequelize.STRING                                            // website khoa
    })
    return Faculty
}