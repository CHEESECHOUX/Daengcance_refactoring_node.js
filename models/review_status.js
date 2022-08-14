const Sequelize = require('sequelize');

module.exports = class ReviewStatus extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      status: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'ReviewStatus',
      tableName: 'reviewstatuses',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }


  static associate(db) {
    db.ReviewStatus.belongsTo(db.Review);
  }
};