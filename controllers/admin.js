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
  const petsitterImageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const petsitter = new Petsitter({
    title: title,
    price: price,
    description: description,
    userId: req.user,
    imageUrl: petsitterImageUrl
  });
  petsitter
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Petsitter');
      res.redirect('/admin/petsitters');
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getEditPetsitter = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const petstId = req.params.petsitterId;
  Petsitter.findByPk(petstId)
    .then(petsitter => {
      // const petsitter = petsitters[0];
      if (!petsitter) {
        return res.redirect('/');
      }
      res.render('admin/edit-petsitter', {
        pageTitle: 'Edit Petsitter',
        path: '/admin/edit-petsitter',
        editing: editMode,
        petsitter: petsitter,
      });
    })
    .catch(err => console.log(err));
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
      console.log('UPDATED PETSITTER!');
      res.redirect('/admin/petsitters');
    })
    .catch(err => console.log(err));
};

exports.getPetsitters = (req, res, next) => {
  Petsitter.findOne()
  .then(petsitters => {
    console.log(petsitters);
    res.render('admin/petsitters', {
      petsts: petsitters,
      pageTitle: 'Admin Petsitters',
      path: '/admin/petsitters'
    });
  })
  .catch(err => console.log(err));
};

exports.postDeletePetsitter = (req, res, next) => {
  const petstId = req.body.petsitterId;
  Petsitter.findByPkAndRemove(petstId)
    .then(() => {
      console.log('DESTROYED PETSITTER');
      res.redirect('/admin/petsitters');
    })
    .catch(err => console.log(err));
};