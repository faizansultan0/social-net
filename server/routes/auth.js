const express = require('express');
const { register,  login, currentUser } = require('../controllers/auth');

const router = express.Router();
    
// Middleware
const { RequireSignIn } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', RequireSignIn ,currentUser);

module.exports = router;