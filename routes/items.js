const express = require('express');
const multer = require('multer');
const upload = multer();
const itemsController = require('../controllers/itemsController');
const router = express.Router();

router.post('/add-item', upload.none(), itemsController.postAddItem);
router.get('/all-items', upload.none(), itemsController.getAllItems);

module.exports = router;