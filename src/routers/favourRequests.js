const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

// Load controllers
const FavoursRequestsController = require('../controllers/favourRequests');

// @route   GET /favourRequests/
// @desc    Get requests
// @access  Private
router.get('/', auth, FavoursRequestsController.get_requests);

// @route   POST /favourRequests/:id/favour
// @desc    Create new favour request
// @access  Private
router.post('/:id', auth, FavoursRequestsController.create_favour_request);

// @route   PATCH /favourRequests/updateMany
// @desc    Update many favour requests
// @access  Private
router.patch('/updateMany', auth, FavoursRequestsController.update_many_requests);

// @route   PATCH /favourRequests/:id
// @desc    Update favour request
// @access  Private
router.patch('/:id/', auth, FavoursRequestsController.update_request);

// @route   DELETE /favourRequests/all/:id
// @desc    Delete all favour's request
// @access  Private
router.delete('/all/:id', auth, FavoursRequestsController.delete_many_requests);

// @route   DELETE /favourRequests/:id
// @desc    Delete request
// @access  Private
router.delete('/:id', auth, FavoursRequestsController.delete_request);


module.exports = router;