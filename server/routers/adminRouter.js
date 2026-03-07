const path = require('path');
const express = require('express');
const { viewApplicants } = require('../queries/applicant_table');
const router = express.Router();

//controllers
const AdmitMember = require(path.resolve(__dirname,'../controllers/AdmitMember.js'));
const ViewApplicants = require(path.resolve(__dirname,'../controllers/ApplicantsView.js'));

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

router.post('/AdmitMember', adminCheck , AdmitMember);
router.get('/ViewApplicants', LeadCheck , ViewApplicants);


module.exports = router;