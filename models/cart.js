const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// module.exports = class Booking extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init({
const cart = sequelize.define('cart', {
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
  modelName: 'Cart',
  tableName: 'carts',
  paranoid: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
});

module.exports = cart;

//   static associate(db) {
//     db.Cart.belongsTo(db.User);
//     db.Cart.belongsTo(db.Petsitter);
//   }
// };