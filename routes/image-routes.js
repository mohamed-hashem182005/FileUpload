const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const admin = require('../middleware/auth-adminMidd');
const uploadMiddleware = require('../middleware/upload-middleware')
const {uploadImageController} = require('../controllers/image-controller')
const router = express.Router()

//upload the image
router.post(
    '/upload',
    authMiddleware,
    admin,
    uploadMiddleware.single('image'),
    uploadImageController
);

//to get all the image
module.exports = router;