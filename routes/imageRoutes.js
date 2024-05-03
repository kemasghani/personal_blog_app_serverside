const express = require('express');
const router = express.Router();
const path = require('path');

// Define route to serve images
router.get('/:imageName', (req, res) => {
    const { imageName } = req.params;
    const imagePath = path.join(__dirname, '../uploads', imageName); // Assuming images are stored in the 'uploads' directory
    res.sendFile(imagePath);
});

module.exports = router;
