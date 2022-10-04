const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-petsitter => GET
router.get('/add-petsitter', adminController.getAddPetsitter);

// /admin/petsitters => GET
router.get('/petsitters', adminController.getPetsitters);

// /admin/add-petsitter => POST
router.post('/add-petsitter', adminController.postAddPetsitter);

router.get('/edit-product/:petsitterId', adminController.getEditPetsitter);

router.post('/edit-petsitter', adminController.postEditPetsitter);

router.post('/delete-petsitter', adminController.postDeletePetsitter);

module.exports = router;