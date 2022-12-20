const Petsitter = require('../models/petsitter');
const Cart = require('../models/cart');

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

exports.getCart = (req, res, next) => {
  const userId = req.session.user.id;
  Cart.findByPk(userId)
    .then(petsitter => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        petsts: petsitter,
        isAuthenticated: req.session.isLoggedIn
      });      
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  //console.log(req.session.user)
  const petstId = req.body.petsitterId;
  const cartItem = req.body.quantity;
  const cart = new Cart({
    petstId: petstId,
    item: cartItem,
    userId: req.session.user.id
  });
  cart
    .save()
    .then(result => {
      console.log('Created Cart');
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err)
    })
};
  // Petsitter.findByPk(petstId)
  //   .then(cart => {
  //     cart.item = updatedItem;
  //     return cart.save();
  //     // return req.session.user.addToCart(petsitter);
  //   })
  //   .then(result => {
  //     console.log('UPDATED CART!');
  //     res.redirect('/cart');
  //   });
// };


// exports.getCart = (req, res, next) => {
//   console.log(req.session);
//   req.session.user // 새로운 요청마다 검색되는 사용자
//     .getCart()
//     .then(cart => {
//       return cart
//       .getPetsitters()
//       .then(petsitters => { // 렌더링
//         res.render('shop/cart', {
//           path: '/cart',
//           pageTitle: 'Your Cart',
//           petsitters: petsitters
//         });
//       })
//       .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));
//   };


//   .populate('cart.items.petsitterId')
//   .execPopulate()
//   .then(user => {
//     const petsitters = user.cart.items;
//     res.render('shop/cart', {
//       path: '/cart',
//       pageTitle: 'Your Cart',
//       petsitters: petsitters,
//     });
//   })
//   .catch(err => console.log(err));
// };


// exports.postCart = (req, res, next) => {
//   const petstId = req.body.petstId;
//   let fetchedCart;
//   let newQuantity = 1; // 기본 수량 1
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getPetsitters({ where: { id: petstId } }); // 이미 장바구니에 있는지 확인
//     })
//     .then(petsitters => {
//       let petsitter;
//       if (petsitters.length > 0) {
//         petsitter = petsitters[0];
//       }
//       if (petsitter) {
//         const oldQuantity = petsitter.cartItem.quantity;
//         newQuantity = oldQuantity + 1; // 수량 하나씩 추가
//         return petsitter;
//       }
//       return Petsitter.findByPk(petstId);
//     })
//     .then(petsitter => {
//       return fetchedCart.addPetsitters(petsitter, {
//         through: { quantity: newQuantity }
//       });
//     })
//     .then(() => {
//       res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// };

exports.postCartDeletePetsitter = (req, res, next) => {
  const petstId = req.body.petsitterId;
  req.user
    .removeFromCart(petstId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};