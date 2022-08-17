const Sequelize = require('sequelize');

module.exports = class PetsitterType extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      petsitter_id: {
        type: Sequelize.INTEGER(40),
        allowNull: false,
      },
      type_id: {
        type: Sequelize.INTEGER(40),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'PetsitterType',
      tableName: 'petsittertypes',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }


  static associate(db) {
    db.PetsitterType.belongsTo(db.Petsitter, {
      foreignKey: 'petsitter_id', sourceKey: "id"
    });
    db.PetsitterType.belongsTo(db.Type, {
      foreignKey: 'type_id', sourceKey: "id"
    });
  }
};