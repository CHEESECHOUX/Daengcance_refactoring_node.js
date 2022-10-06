const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-petsitter => GET
router.get('/add-petsitter', isAuth, adminController.getAddPetsitter);

// /admin/petsitters => GET
router.get('/petsitters', isAuth, adminController.getPetsitters);

// /admin/add-petsitter => POST
router.post('/add-petsitter', isAuth, adminController.postAddPetsitter);

router.get('/edit-product/:petsitterId', isAuth, adminController.getEditPetsitter);

router.post('/edit-petsitter', isAuth, adminController.postEditPetsitter);

router.post('/delete-petsitter', isAuth, adminController.postDeletePetsitter);

module.exports = router;