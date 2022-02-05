const express = require('express');
const { signupUser, loginUser, getAuth } = require('../../Controllers/user/user');
const { isAuthorized } = require('../../Utils/Authorization')
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/auth/current/user',isAuthorized, getAuth);

module.exports = router;