const express = require('express');
const { registerUser, loginUser,changPassword } = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');
const router = express.Router();


//all routes are related to authentication & authorization
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/chang-password', authMiddleware,changPassword);





module.exports = router