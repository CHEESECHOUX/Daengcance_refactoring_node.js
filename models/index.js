const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Petsitter = require('./petsitter');
const PetsitterImage = require('./petsitter_image');
const PetsitterPetSize = require('./petsitter_pet_size');
const PetsitterType = require('./petsitter_type');
const Type = require('./type');
const Review = require('./review');
const ReviewImage = require('./review_image');
const ReviewRating = require('./review_rating');
const ReviewStatus = require('./review_status');
const Booking = require('./booking');
const BookingStatus = require('./booking_status')

const db = {}
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Petsitter = Petsitter;
db.PetsitterImage = PetsitterImage;
db.PetsitterPetSize = PetsitterPetSize;
db.PetsitterType = PetsitterType;
db.Type = Type;
db.Review = Review;
db.ReviewImage = ReviewImage;
db.ReviewRating = ReviewRating;
db.ReviewStatus = ReviewStatus;
db.Booking = Booking;
db.BookingStatus = BookingStatus;

User.init(sequelize);
Petsitter.init(sequelize);
PetsitterImage.init(sequelize);
PetsitterPetSize.init(sequelize);
PetsitterType.init(sequelize);
Type.init(sequelize);
Review.init(sequelize);
ReviewImage.init(sequelize);
ReviewRating.init(sequelize);
ReviewStatus.init(sequelize);
Booking.init(sequelize);
BookingStatus.init(sequelize);

User.associate(db);
Petsitter.associate(db);
PetsitterImage.associate(db);
PetsitterPetSize.associate(db);
PetsitterType.associate(db);
Type.associate(db);
Review.associate(db);
ReviewImage.associate(db);
ReviewRating.associate(db);
ReviewStatus.associate(db);
Booking.associate(db);
BookingStatus.associate(db);

module.exports = db;