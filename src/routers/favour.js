const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

// Load controllers
const FavoursController = require('../controllers/favour');

// @route   GET /favour/
// @desc    Get all favours
// @access  Public
router.get('/', FavoursController.get_all_favours);

// @route   POST /favour/
// @desc    Create new favour
// @access  Private
router.post('/', auth, FavoursController.create_favour);

// @route   GET /favour/:id
// @desc    Get favour by id
// @access  Public
// router.get('/:id', FavoursController.get_favour);

// @route   PATCH /favour/:id
// @desc    Update favour by id
// @access  Private
// router.patch('/:id', auth, FavoursController.update_favour);

module.exports = router;