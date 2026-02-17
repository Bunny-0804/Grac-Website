const path = require('path');
const express = require('express');
const router = express.Router();
//controllers
const JoinRequest = require(path.resolve(__dirname,'../controllers/JoinRequest.js'));


router.post('/apply',JoinRequest);

module.exports = router;