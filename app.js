const path = require('path');

const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const errorController = require('./controllers/error');

const Petsitter = require('./models/petsitter');
const PetsitterImage = require('./models/petsitter-image');
const PetsitterPetSize = require('./models/petsitter-petsize');
const PetsitterPrice = require('./models/petsitter-price');
const PetsitterType = require('./models/petsitter-type');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Review = require('./models/review');
const ReviewImage = require('./models/review-image');
const Type = require('./models/type');

const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'ddaengcance',
  createDatabaseTable: true,
  connectionLimit: 1,
  endConnectionOnClose: true,
  charset: 'utf8mb4_bin',
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
};

const app = express();
const store = new MySQLStore(options);

app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('views', path.join(__dirname, 'views'));

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
// const pageRouter = require('./routes/page');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    key: 'connect.sid',
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(flash());

app.use((req, res, next) => { // user 추출 
  if (!req.session.user) {
    return next();
  }
  User.findByPk(req.session.user._id)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use('/admin', adminRoutes); // 전체 라우트
app.use(shopRoutes);
app.use(authRoutes);
// app.use('/', pageRouter);

app.use(errorController.get404);

Petsitter.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Petsitter);
User.hasMany(Review);
User.hasOne(Cart);

Petsitter.hasMany(PetsitterImage);
Petsitter.hasMany(PetsitterPetSize);
Petsitter.hasMany(PetsitterPrice);
Petsitter.hasMany(Review);
Petsitter.belongsToMany(Cart, { through: CartItem });
Petsitter.belongsToMany(Type, { through: PetsitterType });

PetsitterImage.belongsTo(Petsitter);
PetsitterPetSize.belongsTo(Petsitter);
PetsitterPrice.belongsTo(Petsitter);
Review.hasMany(ReviewImage);
Review.belongsTo(User);
Review.belongsTo(Petsitter);
ReviewImage.belongsTo(Review);
Type.belongsToMany(Petsitter, { through: PetsitterType });
Cart.belongsTo(User);
Cart.belongsToMany(Petsitter, { through: CartItem });

sequelize
  // .sync({ force: true }) // 새로운 코드 db에 적용시키기 (매번 데이터가 사라지니까 주석처리)
  .sync() // 정의한 모든 모델을 둘러보는 메서드
  .then(result => {
    app.listen(8001);
  })
  // // 여기부터
  // .then(result => {
  //   return User.findByPk(1);
  //   console.log(result);
  // })
  // .then(user => {
  //   // if (!user) {
  //   //   return User.create({ name: "Jisoo", email: "jisoochoi@test.com" });
  //   // }
  //   return user;
  // })
  // .then(user => {
  //   // console.log(user);
  //   return user.createCart();
  // })
  // .then(cart => {
  //   // console.log(user);
  //   app.listen(8001);
  // })
  .catch(err => {
    console.log(err);
  });