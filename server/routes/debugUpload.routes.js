const express = require('express');
const router = express.Router();
const debugUploadController = require('../controllers/debugUploadController');

// Debug upload endpoints for troubleshooting
router.post('/upload', debugUploadController.debugUpload);
router.get('/upload-info', debugUploadController.getUploadInfo);

module.exports = router;
