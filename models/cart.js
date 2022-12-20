const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// module.exports = class Booking extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init({
const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true
  },
  // item: {
  //   type: Sequelize.STRING(100),
  //   allowNull: true,
  // },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  // check_in: {
  //   type: Sequelize.DATE(),
  //   allowNull: true,
  // },
  // check_out: {
  //   type: Sequelize.DATE(),
  //   allowNull: true,
  // },
  // status: {
  //   type: Sequelize.STRING(40),
  // },
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

module.exports = Cart;

//   static associate(db) {
//     db.Cart.belongsTo(db.User);
//     db.Cart.belongsTo(db.Petsitter);
//   }
// };