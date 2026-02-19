const path = require('path');
const db = require(path.resolve(__dirname,'../pool.js'));
const query = require(path.resolve(__dirname,'../queries/project_table.js'));

const ProjectDetails = async(req,res) => {
    console.log("Reached here");
    try
    {
        const req_data = req.query;
        const result = await db.query(query.getProjectDetails , [req_data.project_id]);
        if(result.rowCount == 0)
        {
            res.status(204).json({success: true , message: "No tasks for project"});
        }
        else
        {
            res.status(200).json({success:true , message:"Data found" , Data: result.rows});
        }
    }
    catch(error)
    {
        console.log(error.code);
        console.log(error);
        res.status(500).json({success:false , message: "Internal Server Error"});
    }
}

module.exports = ProjectDetails;