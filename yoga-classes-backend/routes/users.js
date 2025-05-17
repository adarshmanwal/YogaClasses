var express = require('express');
const { signUp, login,getProfile } = require('../src/controllers/userControllers');
var router = express.Router();
const authenticateToken = require('../src/middlewares/authMiddleware');
const { inviteEmployee } = require('../src/controllers/users/inviteControllers');
const { acceptInvite } = require('../src/controllers/users/acceptInviteController');
const { getEmployess } = require('../src/controllers/users/getEmployess');
// Register route
router.post('/signup', signUp);

// Login route
router.post('/login', login);


// //delete user
// router.delete('/delete',authenticateToken, deleteProfile);

// // Protected route example
router.get('/profile', authenticateToken, getProfile);

router.get('/getEmployees/:accountId', authenticateToken, getEmployess);

// Shop admin sends an invitation
router.post('/invite/:shopId', authenticateToken, inviteEmployee);

// Employee accepts the invitation
router.post('/accept-invite', acceptInvite);

module.exports = router;
