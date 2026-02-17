const path = require('path');
const express = require('express');
const router = express.Router();
//controllers
const FetchStudentProjects = require(path.resolve(__dirname,'../controllers/FetchStudentProjects.js'));

console.log("Test member Router");

router.get('/getProjects',FetchStudentProjects);

console.log("memeber router executed");

module.exports = router;