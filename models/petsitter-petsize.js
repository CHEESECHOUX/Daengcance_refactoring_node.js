const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// module.exports = class PetsitterPetSize extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init({
const PetsitterPetSize = sequelize.define('petsitterPetSize', {
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
  modelName: 'PetsitterPetSize',
  tableName: 'petsitterPetSizes',
  paranoid: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
});

module.exports = PetsitterPetSize;

//   static associate(db) {
//     db.PetsitterPetSize.belongsTo(db.Petsitter);
//   }
// };