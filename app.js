// const express = require('express');
// const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
// const path = require('path');
// const session = require('express-session');
// const nunjucks = require('nunjucks');
// const dotenv = require('dotenv');
// const passport = require('passport');

// dotenv.config();
// const indexRouter = require('./routes');
// const userRouter = require('./routes/user');
// const authRouter = require('./routes/auth');
// //const pageRouter = require('./routes/page');
// const { sequelize } = require('./models');
// const passportConfig = require('./passport');

// const app = express();

// passportConfig();
// app.set('port', process.env.PORT || 8001);
// // app.set('view engine', 'html');
// // nunjucks.configure('views', {
// //   express: app,
// //   watch: true,
// // });
// // sequelize.sync({force: false})
// //   .then(() => {
// //     console.log('데이터베이스 연결 성공');
// //   })
// //   .catch((err) => {
// //     console.error(err);
// //   });

// //app.get('/', (req, res) => {
// //  res.send('Hello jisoo');
// //});

// app.use(morgan('dev')); 
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(session({
//   resave: false, 
//   saveUninitialized: false,
//   secret: process.env.COOKIE_SECRET,
//   cookie: {
//     httpOnly: true, 
//     secure: false, 
//   },
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/', indexRouter);
// app.use('/user', userRouter);
// app.use('/auth', authRouter);
// //app.use('/', pageRouter);

// app.use((req, res, next) => {
//   const error = new Error(`${req.method}${req.url} 라우터가 없습니다.`);
//   error.status = 404;
//   next(error);
// });

// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.listen(app.get('port'), () => {
//   console.log(app.get('port'), '번 포트에서 대기 중');
// });

// 여기부터 수정
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Petsitter = require('./models/petsitter');
const PetsitterImage = require('./models/petsitter-image');
const PetsitterPetSize = require('./models/petsitter-petsize');
const PetsitterPrice = require('./models/petsitter-price');
const PetsitterType = require('./models/petsitter-type');
const User = require('./models/user');
const Booking = require('./models/booking');
const Review = require('./models/review');
const ReviewImage = require('./models/review-image');
const Type = require('./models/type');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('views', path.join(__dirname, 'views'));

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
  .then(user => {
    req.user= user;
    next();
  })
  .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Petsitter.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Petsitter);
User.hasMany(Review);
User.hasMany(Booking);

Petsitter.hasMany(PetsitterImage);
Petsitter.hasMany(PetsitterPetSize);
Petsitter.hasMany(PetsitterPrice);
Petsitter.hasMany(Review);
Petsitter.hasMany(Booking);
Petsitter.belongsToMany(Type, { through: PetsitterType });

PetsitterImage.belongsTo(Petsitter);
PetsitterPetSize.belongsTo(Petsitter);
PetsitterPrice.belongsTo(Petsitter);
Review.hasMany(ReviewImage);
Review.belongsTo(User);
Review.belongsTo(Petsitter);
ReviewImage.belongsTo(Review);
Type.belongsToMany(Petsitter, { through: PetsitterType });
Booking.belongsTo(User);
Booking.belongsTo(Petsitter);

//sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
//  .then(function() {
//  sequelize
//      .sync({ force: true })
//      .then(function() {
//        sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
//          .then(function() {
//            console.log('Database synchronised');
//          });
//      }).error(function(err) {
//          console.log(err);
//      });
//  })

  // .sync({ force: true })       // 새로운 코드 db에 적용시키기 (매번 데이터가 사라지니까 주석처리)
sequelize
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
    })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Jisoo', email: 'Jisoo@test.com' });
    }
    return Promise.resolve(user);
    return user;
  })
  // .then(user => {
  //   // console.log(user);
  //   return user.createCart();
  
  // })
  .then(cart => {
    app.listen(8000);
  })                         
  .catch(err => {
    console.log(err);
  });