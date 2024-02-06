const express = require('express')
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/usercontroller')

router.post('/', registerUser);
router.post('/login', loginUser);

const { protect }= require('../middleware/authmiddleware');

router.get('/me', protect, getMe);

module.exports = router;
