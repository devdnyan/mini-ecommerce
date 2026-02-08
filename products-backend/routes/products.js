const express = require('express');
const router = express.Router();
const path = require('path');
const productsData = require(path.join(__dirname, '..', 'products', 'data.json'));

router.get('/products', (req, res) => {
  res.json(productsData);
});

module.exports = router;