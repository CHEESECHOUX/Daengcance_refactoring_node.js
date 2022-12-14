const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// module.exports = class Type extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init({
const Type = sequelize.define('type', {
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
  modelName: 'Type',
  tableName: 'types',
  paranoid: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
});

module.exports = Type;

//   static associate(db) {
//     db.Type.belongsToMany(db.Petsitter, {
//       through: 'PetsitterType',
//     });
//   }
// };