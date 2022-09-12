const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// module.exports = class Review extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init({
const Review = sequelize.define('review', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER(30),
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING(40),
    allowNull: true,
  }
}, {
  sequelize,
  timestamps: true,
  underscored: false,
  modelName: 'Review',
  tableName: 'reviews',
  paranoid: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
});

module.exports = Review;

//   static associate(db) {
//     db.Review.hasMany(db.ReviewImage);
//     db.Review.belongsTo(db.User);
//     db.Review.belongsTo(db.Petsitter);
//   }
// };