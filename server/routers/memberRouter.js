const path = require('path');
const express = require('express');
const router = express.Router();
//controllers
const FetchStudentProjects = require(path.resolve(__dirname,'../controllers/FetchStudentProjects.js'));
const ActiveProjects = require(path.resolve(__dirname,'../controllers/ActiveProjects.js'));
const ProjectDetails = require(path.resolve(__dirname,'../controllers/ProjectDetails.js'));
const ActiveEvents = require(path.resolve(__dirname,"../controllers/ActiveEvents.js"));
const AvailableResources = require(path.resolve(__dirname,"../controllers/AvailableResources.js"));
const StudentResources = require(path.resolve(__dirname,"../controllers/StudentResources.js"));


console.log("Test member Router");

router.get('/MemberProjects',FetchStudentProjects);
router.get('/ActiveProjects',ActiveProjects);
router.get('/ProjectDetails',ProjectDetails);
router.get('/ActiveEvents',ActiveEvents);
router.get('/AvailableResources',AvailableResources);
router.get('/StudentResources',StudentResources);

    
console.log("memeber router executed");

module.exports = router;