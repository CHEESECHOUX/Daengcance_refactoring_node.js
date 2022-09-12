const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// module.exports = class Booking extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init({
const Booking = sequelize.define('booking', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
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
  quantity: Sequelize.INTEGER
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

module.exports = Booking;

//   static associate(db) {
//     db.Booking.belongsTo(db.User);
//     db.Booking.belongsTo(db.Petsitter);
//   }
// };