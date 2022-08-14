const Sequelize = require('sequelize');

module.exports = class PetsitterImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      petsitter_image_url: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'PetsitterImage',
      tableName: 'petsitterimages',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }


  static associate(db) {
    db.PetsitterImage.belongsTo(db.Petsitter);
  }
};