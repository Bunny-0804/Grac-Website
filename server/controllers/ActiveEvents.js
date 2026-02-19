const path = require('path');
const db = require(path.resolve(__dirname,"../pool.js"));
const query = require(path.resolve(__dirname,"../queries/events_table.js"));

const ActiveEvents = async(req,res) => {
    try
    {
        const result = await db.query(query.activeEvents);
        if(result.rowCount == 0)
        {
            res.status(204).json({success: true , message: "No Active Events"});
        }
        else
        {
            res.status(200).json({success: true , message: "Data Found" , Data: result.rows});
        }
        
    }
    catch(error)
    {
        console.log(error.code);
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error , try again"});
    }
}

module.exports = ActiveEvents;