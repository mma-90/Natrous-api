const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js');
const validateID = require('../middlewares/validateID');

router
  .route('/')
  .get(usersController.getAllusers)
  .post(usersController.createTour);

router.use('/:id', validateID);

router
  .route('/:id')
  .get(usersController.getTour)
  .patch(usersController.updateTour)
  .delete(usersController.deleteTour);

module.exports = router;
