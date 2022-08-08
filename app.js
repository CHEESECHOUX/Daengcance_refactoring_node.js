const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const pageRouter = require('./routes/page');

const app = express();
app.set('port', process.env.PORT || 8001);
//app.set('view engine', 'html');
//nunjucks.configure('views', {
//  express: app,
//  watch: true,
//});

app.use(morgan('dev')); 
app.use(express.static(path.join(__dirname, 'public'))); //static 미들웨어
app.use(express.json()); //body-parser
app.use(express.urlencoded({ extended: false })); //false면 노드의 querystring 모듈을 사용해, true면 따로 설치가 필요한 npm qs모듈을 사용해 쿼리스트링을 해석
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false, //요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할 것인지 설정
  saveUninitialized: false, //세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true, //클라이언트에서 쿠키를 확인하지 못하도록 설정
    secure: false, //https가 아닌 환경에서도 사용할 수 있게 설정
  },
}));

app.use('/', pageRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method}${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
