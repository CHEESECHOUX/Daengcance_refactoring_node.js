const Sequelize = require('sequelize');

module.exports = class ReviewImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      review_image_url: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'ReviewImage',
      tableName: 'reviewimages',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }


  static associate(db) {
    db.ReviewImage.belongsTo(db.Review);
  }
};