const path = require('path');
const express = require('express');
const router = express.Router();
//controllers
const JoinRequest = require(path.resolve(__dirname,'../controllers/JoinRequest.js'));
const SignIn = require(path.resolve(__dirname,'../controllers/SignIn.js'));

router.post('/apply',JoinRequest);
router.post('/SignIn',SignIn);

module.exports = router;