const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// module.exports = class PetsitterPrice extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init({
const PetsitterPrice = sequelize.define('petsitterPrice', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(40),
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  underscored: false,
  modelName: 'PetsitterPrice',
  tableName: 'petsitterPrices',
  paranoid: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
});

module.exports = PetsitterPrice;

//   static associate(db) {
//     db.PetsitterPrice.belongsTo(db.Petsitter);
//   }
// };