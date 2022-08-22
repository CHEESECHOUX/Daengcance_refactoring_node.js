const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Petsitter = require('./petsitter');
const PetsitterImage = require('./petsitter_image');
const PetsitterPetSize = require('./petsitter_pet_size');
const PetsitterPrice = require('./petsitter_price');
const Type = require('./type');
const Review = require('./review');
const ReviewImage = require('./review_image');
const Booking = require('./booking');

const db = {}
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Petsitter = Petsitter;
db.PetsitterImage = PetsitterImage;
db.PetsitterPetSize = PetsitterPetSize;
db.PetsitterPrice = PetsitterPrice;
db.Type = Type;
db.Review = Review;
db.ReviewImage = ReviewImage;
db.Booking = Booking;

User.init(sequelize);
Petsitter.init(sequelize);
PetsitterImage.init(sequelize);
PetsitterPetSize.init(sequelize);
PetsitterPrice.init(sequelize);;
Type.init(sequelize);
Review.init(sequelize);
ReviewImage.init(sequelize);
Booking.init(sequelize);

User.associate(db);
Petsitter.associate(db);
PetsitterImage.associate(db);
PetsitterPetSize.associate(db);
PetsitterPrice.associate(db);
Type.associate(db);
Review.associate(db);
ReviewImage.associate(db);
Booking.associate(db);


module.exports = db;