const Sequelize = require('sequelize');

module.exports = class Type extends Sequelize.Model {
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
      modelName: 'Type',
      tableName: 'types',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }


  static associate(db) {
    db.Type.belongsToMany(db.Petsitter, {
      //foreignKey: 'petsitterId',
      through: 'PetsitterType',
    });
  }
};