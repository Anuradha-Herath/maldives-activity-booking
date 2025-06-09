const express = require('express');
const router = express.Router();

// This is a placeholder route file to prevent the 'module not found' error
// It doesn't contain any actual functionality and should only be used in development

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Debug upload route is working'
  });
});

module.exports = router;
