const Sequelize = require('sequelize');

module.exports = class Booking extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      check_in: {
        type: Sequelize.DATE(),
        allowNull: false,
      },
      check_out: {
        type: Sequelize.DATE(),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(40),
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Booking',
      tableName: 'bookings',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }


  static associate(db) {
    db.Booking.hasMany(db.BookingStatus);
    db.Booking.belongsTo(db.User);
    db.Booking.belongsTo(db.Petsitter);
  }
};