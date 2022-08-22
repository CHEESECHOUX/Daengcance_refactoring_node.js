const Sequelize = require('sequelize');

module.exports = class Petsitter extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      grade: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      count: {
        type: Sequelize.INTEGER(30),
      },
      information: {
        type: Sequelize.STRING(2000),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: false,
      },
      latitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Petsitter',
      tableName: 'petsitters',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }


  static associate(db) {
    db.Petsitter.hasMany(db.PetsitterImage);
    db.Petsitter.hasMany(db.PetsitterPetSize);
    db.Petsitter.hasMany(db.PetsitterPrice);
    db.Petsitter.hasMany(db.Review);
    db.Petsitter.hasMany(db.Booking);
    db.Petsitter.belongsToMany(db.Type, {
      through: 'PetsitterType',
    });
  }
};