const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// module.exports = class PetsitterImage extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init({
const PetsitterImage = sequelize.define('petsitterImage', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  petsitter_image_url: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  underscored: false,
  modelName: 'PetsitterImage',
  tableName: 'petsitterImages',
  paranoid: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
});

module.exports = PetsitterImage

//   static associate(db) {
//     db.PetsitterImage.belongsTo(db.Petsitter);
//   }
// };