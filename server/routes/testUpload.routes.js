const express = require('express');
const router = express.Router();
const testUploadController = require('../controllers/testUploadController');

router.post('/', testUploadController.testFileUpload);

module.exports = router;
