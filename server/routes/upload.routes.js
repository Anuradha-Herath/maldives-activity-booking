const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// Route to upload an image
router.post('/', uploadController.uploadImage);

module.exports = router;
