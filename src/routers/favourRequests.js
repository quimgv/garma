const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

// Load controllers
const FavoursRequestsController = require('../controllers/favourRequests');

// @route   POST /favourRequests/:id
// @desc    Create new favour request
// @access  Private
router.post('/:id/', auth, FavoursRequestsController.create_favour_request);

// @route   GET /favourRequests/favour/:id
// @desc    Get all favour's requests
// @access  Private
router.get('/favour/:id', auth, FavoursRequestsController.get_favour_requests);

// @route   DELETE /favourRequests/:id
// @desc    Delete request
// @access  Private
router.delete('/:id', auth, FavoursRequestsController.delete_request);

module.exports = router;