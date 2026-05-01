const path = require('path');
const express = require('express');
const { viewApplicants } = require('../queries/applicant_table');
const { updateTaskResource } = require('../queries/task_table');
const router = express.Router();

//controllers
const AdmitMember = require(path.resolve(__dirname,'../controllers/AdmitMember.js'));
const ViewApplicants = require(path.resolve(__dirname,'../controllers/ApplicantsView.js'));
const DeleteApplicant = require(path.resolve(__dirname,'../controllers/DeleteApplicant.js'));
const AddProject = require(path.resolve(__dirname,'../controllers/AddProject.js'));
const AddTask = require(path.resolve(__dirname,'../controllers/AddTasks.js'));
const AssignResource = require(path.resolve(__dirname,'../controllers/AssignTaskResource.js'));
const DeleteMember = require(path.resolve(__dirname,'../controllers/DeleteMember.js'));
const DeleteTaskAssignment = require(path.resolve(__dirname,'../controllers/DeleteTaskAssignment.js'));
const DeleteTask = require(path.resolve(__dirname,'../controllers/DeleteTasks.js'));
const RetriveResource = require(path.resolve(__dirname,'../controllers/RetriveResource.js'));
const SetRole = require(path.resolve(__dirname,'../controllers/SetMemberRole.js'));
const SetStatus = require(path.resolve(__dirname,'../controllers/SetMemberStatus.js'));
const SetTaskStatus = require(path.resolve(__dirname , '../controllers/setTaskStatus.js'));
const UpdateProject = require(path.resolve(__dirname , '../controllers/UpdateProject.js'));
const UpdateResourceAssignment = require(path.resolve(__dirname , '../controllers/UpdateTaskResource.js'));
const UpdateTask = require(path.resolve(__dirname , '../controllers/UpdateTasks.js'));


//Check if admin
const adminCheck = (req,res,next) => {
    if(req.user && req.user.member_role === 'Admin')
    {
        next();
    }
    else
    {
        res.status(403).json({success : false , message : "Admin privilages not found. Invalid Request"});
    }
};

const LeadCheck = (req,res,next) => {
    if(req.user && (req.user.member_role === 'Lead' ) || (req.user.member_role === 'Admin')) 
    {
        next();
    }
    else
    {
        res.status(403).json({success : false , message : "Privilages not found. Invalid Request"});
    }
};

router.get('/ViewApplicants', LeadCheck , ViewApplicants);
router.post('/AdmitMember', adminCheck , AdmitMember);
router.put('/SetRole', adminCheck , SetRole);
router.put('/SetStatus', adminCheck , SetStatus);
router.post('/AddProject', LeadCheck , AddProject);
router.post('/AddTask', LeadCheck , AddTask);
router.put('/SetTaskStatus', LeadCheck , SetTaskStatus);
router.put('/UpdateProject', LeadCheck , UpdateProject);
router.put('/UpdateTask', LeadCheck , UpdateTask);
router.put('/UpdateResourceAssignment', adminCheck , UpdateResourceAssignment);
router.post('/AssignResource', adminCheck , AssignResource);
router.post('/DeleteApplicant' , adminCheck , DeleteApplicant);
router.post('/DeleteMember' , adminCheck , DeleteMember);
router.post('/DeleteTaskAssignment', LeadCheck , DeleteTaskAssignment);
router.post('/DeleteTask', LeadCheck , DeleteTask);
router.post('/RetriveResource', adminCheck , RetriveResource);

module.exports = router;