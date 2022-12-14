module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  next();
}

// exports.isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(403).send('로그인이 필요합니다.');
//   }
// };

// exports.isNotLoggedIn = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     next();
//   } else {
//     const message = encodeURIComponent('로그인 된 상태입니다.');
//     res.redirect(`/?error=${message}`);
//   }
// };