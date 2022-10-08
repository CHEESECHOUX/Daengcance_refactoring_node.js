const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;

// const passport = require('passport');
// const bcrypt = require('bcrypt');
// const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
// const User = require('../models/user');

// let arr = [];

// router.post('/signup', isNotLoggedIn, async (req, res, next) => {
//   const { email, nick, password } = req.body;
//   try {
//     const exUser = await User.findOne({ where: { email } });
//     if (exUser) {
//       return res.redirect('/join?error=exist');
//     }
//     const hash = await bcrypt.hash(password, 12);
//     await User.create({
//       email,
//       nick,
//       password: hash,
//     });
//     return res.redirect('/');
//   } catch (error) {
//     console.error(error);
//     return next(error);
//   }
// });

// router.post('/login', isNotLoggedIn, (req, res, next) => {
//   passport.authenticate('local', (authError, user, info) => {
//     if (authError) {
//       console.error(authError);
//       return next(authError);
//     }
//     if (!user) {
//       return res.redirect(`/?loginError=${info.message}`);
//     }
//     return req.login(user, (loginError) => {
//       if (loginError) {
//         console.error(loginError);
//         return next(loginError);
//       }
//       return res.redirect('/');
//     });
//   })(req, res, next);
// });

// router.get('/logout', isLoggedIn, (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.redirect('/');
// });

// router.get('/kakao', passport.authenticate('kakao'));

// router.get('/kakao/callback', passport.authenticate('kakao', {
//   failureRedirect: '/',
// }), (req, res) => {
//   res.redirect('/');
// });

// router.put('/update/:id', isLoggedIn, (req, res) => {
//   return data.update({
//     id: req.params,
//     Password: req.body.Password
// }, {
//     where : {
//       id: id /*like this*/  }}).then(function (data) {
//     if (data) {
//         res.send(data)
//     } else {
//         res.status(400).send('Error')
//     }
// })
  


//   //res.redirect('/');
//   })

// router.delete('/delete/:id', (req, res) => {
//   const { id } = req.params;
//   arr.splice(id, 1);
//   res.status(200).json({
//     message: 'delete 성공',
//     result: arr
//   });
// });

// module.exports = router;