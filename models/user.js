const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      kakao_id: {
        type: Sequelize.INTEGER(30),
        allowNull: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      nickname: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      mobile: {
        type: Sequelize.INTEGER(40),
        allowNull: true,
      },
      profile_image_url: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }


  static associate(db) {
    db.User.hasMany(db.Review);
    db.User.hasMany(db.Booking);
  }
};