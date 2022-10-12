const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// module.exports = class Petsitter extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init({

const Petsitter = sequelize.define('petsitter', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(40),
    allowNull: true,
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  grade: {
    type: Sequelize.STRING(40),
    allowNull: true,
  },
  count: {
    type: Sequelize.INTEGER(30),
  },
  information: {
    type: Sequelize.STRING(2000),
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  longitude: {
    type: Sequelize.DECIMAL(9, 6),
    allowNull: true,
  },
  latitude: {
    type: Sequelize.DECIMAL(9, 6),
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.STRING(1000),
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING(2000),
    allowNull: true
  },
  price: {
    type: Sequelize.DECIMAL(6, 2),
    allowNull: false
  },
}, {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Petsitter',
    tableName: 'petsitters',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

module.exports = Petsitter;

//   static associate(db) {
//     db.Petsitter.hasMany(db.PetsitterImage);
//     db.Petsitter.hasMany(db.PetsitterPetSize);
//     db.Petsitter.hasMany(db.PetsitterPrice);
//     db.Petsitter.hasMany(db.Review);
//     db.Petsitter.hasMany(db.Booking);
//     db.Petsitter.belongsToMany(db.Type, {
//       through: 'PetsitterType',
//     });
//   }
// };