const express = require('express');
const router = express.Router();

// This is a placeholder route file to prevent the 'module not found' error
// It doesn't contain any actual functionality and can be removed or replaced later

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Test upload route is working'
  });
});

module.exports = router;
