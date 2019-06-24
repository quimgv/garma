const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

// Load controllers
const FavoursRequestsController = require('../controllers/favourRequests');

// @route   POST /favourRequests/:id
// @desc    Create new favour request
// @access  Private
router.post('/:id/', auth, FavoursRequestsController.create_favour_request);

// @route   DELETE /favourRequests/:id
// @desc    Delete request
// @access  Private
router.delete('/:id', auth, FavoursRequestsController.delete_request);

// @route   PATCH /favourRequests/updateMany
// @desc    Update many favour requests
// @access  Private
router.patch('/updateMany', auth, FavoursRequestsController.update_many_requests);

// @route   PATCH /favourRequests/:id
// @desc    Update favour request
// @access  Private
router.patch('/:id/', auth, FavoursRequestsController.update_request);

// @route   GET /favourRequests/favour/:id
// @desc    Get all favour's requests
// @access  Private
router.get('/favour/:id', auth, FavoursRequestsController.get_favour_requests);

module.exports = router;