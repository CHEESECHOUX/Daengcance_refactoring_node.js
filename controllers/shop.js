const Petsitter = require('../models/petsitter');

exports.getPetsitters = (req, res, next) => {
  Petsitter.findAll()
    .then(petsitters => {
      res.render('shop/petsitter-list', {
        petsts: petsitters,
        pageTitle: 'All Petsitters',
        path: '/petsitters'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// findAll, findByPk 둘 다 사용 가능
exports.getPetsitter = (req, res, next) => {
  const petsitterId = req.params.petsitterId;
  // Petsitter.findAll({where: { id: petstId } }) 
  //   .then(petsitters => {
  //     res.render('shop/petsitter-detail', {
  //       pretsitter: petsitters[0], // findAll 함수는 디폴트로 배열을 줌 0으로 잡아줘야함
  //       pageTitle: petsitters[0].title,
  //       path: '/petsitters'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Petsitter.findByPk(petsitterId) 
    .then(petsitter => {
      res.render('shop/petsitter-detail', {
        petsitter: petsitter,
        pageTitle: petsitter.title,
        path: '/petsitters'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Petsitter.findAll()
    .then(petsitters => {
      res.render('shop/index', {
        petsts: petsitters,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};