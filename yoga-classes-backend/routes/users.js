var express = require('express');
const { signUp, login } = require('../src/controllers/userControllers');
var router = express.Router();

// Register route
router.post('/signup', signUp);

// Login route
router.post('/login', login);


// //delete user
// router.delete('/delete',authenticateToken, deleteProfile);

// // Protected route example
// router.get('/profile', authenticateToken, getProfile);

module.exports = router;
