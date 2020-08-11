module.exports = (sequelize, Sequelize) => {
    const Partner = sequelize.define('partners', {
        name:           Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',   // Tên đối tác
        abbreviation:   Sequelize.STRING,                                           // Tên viết tắt
        president:      Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',   // Giám đốc
        founding_date:  Sequelize.DATEONLY,                                         // Ngày thành lập
        phone:          Sequelize.STRING,                                           // Điện thoại
        address:        Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',   // Địa chỉ
        email:          Sequelize.STRING,                                           // email của đối tác
        website:        Sequelize.STRING                                            // website đối tác
    })
    return Partner
}