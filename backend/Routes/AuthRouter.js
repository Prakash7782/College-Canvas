const { signup, login, googleLogin } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);


// Google OAuth login
router.post('/google-login', googleLogin);
const { saveCanvas } = require('../Controllers/CanvasController');
router.post('/save-canvas', saveCanvas);


module.exports = router;