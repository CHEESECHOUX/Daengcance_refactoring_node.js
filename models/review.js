const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
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
  }


  static associate(db) {
    db.Review.hasMany(db.ReviewImage);
    db.Review.hasMany(db.ReviewStatus);
    db.Review.belongsTo(db.User);
    db.Review.belongsTo(db.Petsitter);
  }
};