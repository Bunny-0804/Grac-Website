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
const getComments = require(path.resolve(__dirname , '../controllers/GetComments.js'));
const getTopPosts = require(path.resolve(__dirname , '../controllers/GetTopPosts.js'));
const getLatestPosts = require(path.resolve(__dirname , '../controllers/GetLatestPosts.js'));
const getByTagsLatest = require(path.resolve(__dirname , '../controllers/GetByTagsLatest.js'));
const getByTagsTop = require(path.resolve(__dirname , '../controllers/GetByTagsTop.js'));
const Post = require(path.resolve(__dirname , '../controllers/Post.js'));
const RefreshToken = require(path.resolve(__dirname, '../controllers/RefreshToken.js'));
const LogOut = require(path.resolve(__dirname, '../controllers/LogOut.js'));
const HandleRequest = require(path.resolve(__dirname, '../controllers/TaskHandleRequest.js'));

console.log("Test member Router");

router.get('/MemberProjects',FetchStudentProjects);
router.get('/ActiveProjects',ActiveProjects);
router.get('/ProjectDetails',ProjectDetails);
router.get('/ActiveEvents',ActiveEvents);
router.get('/AvailableResources',AvailableResources);
router.get('/StudentResources',StudentResources);
router.get('/getComments',getComments);
router.get('/getTopPosts',getTopPosts);
router.get('/getLatestPosts',getLatestPosts);
router.get('/getByTagsLatest',getByTagsLatest);
router.get('/getByTagsTop',getByTagsTop);
router.get('/RefreshToken',RefreshToken);
router.get('/HandleRequest',HandleRequest);
router.get('/LogOut',LogOut);
router.post('/post',Post);
    
console.log("memeber router executed");

module.exports = router;