const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

// Load controllers
const FavoursRequestsController = require('../controllers/favourRequests');

// @route   POST /favour/requests/:id/favour
// @desc    Create new favour request
// @access  Private
router.post('/:id', auth, FavoursRequestsController.create_favour_request);

// @route   GET /favour/requests/all
// @desc    Get all requests
// @access  Private
router.get('/all', auth, FavoursRequestsController.get_requests);

// @route   GET /favour/requests/:id/favour
// @desc    Get favour requests
// @access  Private
router.get('/:id/favour', auth, FavoursRequestsController.get_favour_requests);

// @route   GET /favour/requests/:id/user
// @desc    Get all user requests
// @access  Private
router.get('/:id/user', auth, FavoursRequestsController.get_user_requests);

// @route   GET /favour/requests/:id/user
// @desc    Get requests as an owner
// @access  Private
router.get('/:id/owner', auth, FavoursRequestsController.get_user_requests);

// @route   GET /favour/requests/:id/user
// @desc    Get requests as a helper
// @access  Private
router.get('/:id/helper', auth, FavoursRequestsController.get_user_requests);

// @route   PATCH /favour/requests/updateMany
// @desc    Update many favour requests
// @access  Private
router.patch('/updateMany', auth, FavoursRequestsController.update_many_requests);

// @route   PATCH /favour/requests/:id
// @desc    Update favour request
// @access  Private
router.patch('/:id/', auth, FavoursRequestsController.update_request);

// @route   DELETE /favour/requests/all/:id
// @desc    Delete all favour's request
// @access  Private
router.delete('/all/:id', auth, FavoursRequestsController.delete_all_favour_requests);

// @route   DELETE /favour/requests/:id
// @desc    Delete request
// @access  Private
router.delete('/:id', auth, FavoursRequestsController.delete_request);


module.exports = router;