const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// module.exports = class ReviewImage extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init({
const ReviewImage = sequelize.define('reviewImage', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  review_image_url: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  underscored: false,
  modelName: 'ReviewImage',
  tableName: 'reviewImages',
  paranoid: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
});

module.exports = ReviewImage;

//   static associate(db) {
//     db.ReviewImage.belongsTo(db.Review);
//   }
// };