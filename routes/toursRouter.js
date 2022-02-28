const express = require('express');
const router = express.Router();
const toursController = require('../controllers/toursController.js');
const validateID = require('./../middlewares/validateID');

router
  .route('/')
  .get(toursController.getAllTours)
  .post(toursController.createTour);

router.use('/:id', validateID);

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

module.exports = router;
