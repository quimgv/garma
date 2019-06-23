const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

// Load controllers
const FavoursRequestsController = require('../controllers/favourRequests');

// @route   POST /favourRequests/:id
// @desc    Create new favour request
// @access  Private
router.post('/:id/', auth, FavoursRequestsController.create_favour_request);

module.exports = router;