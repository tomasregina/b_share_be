const express = require('express');
const multer = require('multer');
const upload = multer();
const passport = require('passport');
const { body, validationResult } = require('express-validator');

const usersController = require('../controllers/usersController');

const router = express.Router();
router.post('/register-user', [ 
    upload.none(), 
    body('email').isEmail(),
    body('password').exists().isLength({ min: 8 }),
    body('password').exists().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    ], 
    usersController.postRegisterUser);
router.post('/login-user', upload.none(), usersController.postLoginUser);
router.post('/logout-user', upload.none(), usersController.postLogoutUser);

module.exports = router;