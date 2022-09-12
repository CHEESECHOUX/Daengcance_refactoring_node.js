const Petsitter = require('../models/petsitter');

exports.getAddPetsitter = (req, res, next) => {
  res.render('admin/edit-petsitter', {
    pageTitle: 'Add Petsitter',
    path: '/admin/add-petsitter',
    editing: false
  });
};

exports.postAddPetsitter = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
  .createPetsitter({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    .then(result => {
      // console.log(result);
      console.log('Created Petsitter');
      res.redirect('/admin/petsitters');
    })
    .catch(err => {
      console.log(err)
  });
    // .save()
    // .then(() => {
    //   res.redirect('/');
    // })
    // .catch(err => console.log(err));
};

exports.getEditPetsitter = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const petstId = req.params.petsitterId;
  req.user
  .getPetsitters({where: {id: petstId}})
  // Petsitter.findByPk(petstId)
  .then(petsitters => {
    const petsitter = petsitters[0];
    if (!petsitter) {
      return res.redirect('/');
    }
    res.render('admin/edit-petsitter', {
      pageTitle: 'Edit Petsitter',
      path: '/admin/edit-petsitter',
      editing: editMode,
      petsitter: petsitter
    });
  })
  .catch(err => console.log(err)
  );
};

exports.postEditPetsitter = (req, res, next) => {
  const petstId = req.body.petsitterId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Petsitter.findByPk(petstId)
    .then(petsitter => {
      petsitter.title = updatedTitle;
      petsitter.price = updatedPrice;
      petsitter.description = updatedDesc;
      petsitter.imageUrl = updatedImageUrl;
      return petsitter.save();
    })
    .then(result => {
      console.log('UPDATED Petsitter!');
      res.redirect('/admin/petsitters');
    })
    .catch(err => console.log(err));
};

exports.getPetsitters = (req, res, next) => {
  // Petsitter.findAll()
  req.user
  .getPetsitters() 
  .then(petsitters => {
    res.render('admin/petsitters', {
      prods: petsitters,
      pageTitle: 'Admin Petsitters',
      path: '/admin/petsitters'
    });
  })
  .catch(err => console.log(err));
};

exports.postDeletePetsitter = (req, res, next) => {
  const petstId = req.body.petsitterId;
  Petsitter.findByPk(petstId)
    .then(petsitter => {
      return petsitter.destroy();
    })
    .then(result => {
      console.log('DESTROYED PETSITTER');
      res.redirect('/admin/petsitters');
    })
    .catch(err => console.log(err));
};