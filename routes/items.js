const express = require('express');
const multer = require('multer');
const upload = multer();
const itemsController = require('../controllers/itemsController');
const { route } = require('./users');
const router = express.Router();

router.post('/add-item', upload.none(), itemsController.postAddItem);
router.get('/all-items', upload.none(), itemsController.getAllItemsCount);
router.post('/load-items', upload.none(), itemsController.loadItems);
router.get('/load-items', itemsController.loadItems);

module.exports = router;