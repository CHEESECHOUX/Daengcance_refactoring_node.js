const Sequelize = require('sequelize');

module.exports = class BookingStatus extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      status: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'BookingStatus',
      tableName: 'bookingstatuses',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }


  static associate(db) {
    db.BookingStatus.belongsTo(db.Booking);
  }
};