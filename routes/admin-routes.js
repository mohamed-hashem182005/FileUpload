const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const admin = require('../middleware/auth-adminMidd');

router.get('/welcome', authMiddleware,admin,(req, res, next) => {
    return res.json({
        sucess: true,
        message: 'wlecome in admin page in this routes'
    });
    
});

module.exports = router;