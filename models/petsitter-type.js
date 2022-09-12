const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const PetsitterType = sequelize.define('petsitterType', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  petsitterId: {
    type: Sequelize.STRING(40),
    allowNull: false,
  },
  typeId: {
    type: Sequelize.STRING(40),
    allowNull: false,
  },
  quantity: Sequelize.INTEGER
}, {
  sequelize,
  timestamps: true,
  underscored: false,
  modelName: 'PetsitterType',
  tableName: 'petsittertypes',
  paranoid: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
});

module.exports = PetsitterType;