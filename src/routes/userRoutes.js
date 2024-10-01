const express = require('express');
const { createUser, getUser } = require('../controllers/userController');

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get a user by ID
router.get('/:id', getUser);

module.exports = router;
