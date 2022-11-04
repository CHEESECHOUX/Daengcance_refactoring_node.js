const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email; // 요청에서 이메일 추출
  const password = req.body.password;
  User.findOne({ where: { email: email }, })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password) // 요청안에 패스워드, DB내 패스워드
        .then(doMatch => {
          if (doMatch) { // 비밀번호가 같다면 세션까지 설정
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => { // login페이지로 가지 않도록 return
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ where: { email: email },
    }) // DB 모델 이메일 : 추출한 이메일
    .then(userDoc => {
      if (userDoc) { // 사용자 있다면
        req.flash('error', 'E-Mail exists already, please pick a different one. ');
        return res.redirect('/signup');
      }
      return bcrypt
      .hash(password, 12) // 해시하고 싶은 문자열, 솔트값
      .then(hashedPassword => {
        const user = new User({
          email: email,
          password: hashedPassword,
          cart: { items: [] } // 디폴트로 빈 배열인  객체
        });
        return user.save(); // DB에 저장
      })
      .then(result => {
        res.redirect('/login');
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};