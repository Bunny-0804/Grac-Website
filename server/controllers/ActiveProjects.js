const path = require('path');
const db = require(path.resolve(__dirname,'../pool.js'));
const query = require(path.resolve(__dirname,'../queries/project_table.js'));

const ActiveProjects = async(req,res) => {
    console.log("Reached here");
    try
    {
        const result = await db.query(query.getProjects);
        if(result.rowCount == 0)
        {
            res.status(204).json({success: true , message: "No active projects"});
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

module.exports = ActiveProjects;