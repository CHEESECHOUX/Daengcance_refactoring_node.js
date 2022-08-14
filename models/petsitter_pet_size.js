const Sequelize = require('sequelize');

module.exports = class PetsitterPetSize extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'PetsitterPetSize',
      tableName: 'petsitterpetsizes',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }


  static associate(db) {
    db.PetsitterPetSize.belongsTo(db.Petsitter);
  }
};