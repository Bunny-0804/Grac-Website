//import path and use path to properly locate pool and query
const path = require('path');
const crypto = require('crypto');
const url = require('url');
const db = require(path.resolve(__dirname, '../pool.js'));
const query = require(path.resolve(__dirname, '../queries/task_table.js'));
require('dotenv').config(path.resolve(__dirname , '../../.env'));

const deleteMember = async (req, res) => {
    //console.log("reached here");
    try {
        let x = false;
        const data = req.body;
        const valid = ['png' , 'pdf' , 'jpeg' , 'jpg' , 'zip' , 'txt' , 'docx' , 'pptx'];
        for(const type in valid)
        {
            if(type === data.file_type)
            {
                x = true;
                break;
            }
        }
        if(x === false)
        {
            return res.status(403).json({success : false , message : "Invalid file type"});
        }
        const filePath = `${data.member_id}/${Date.now()}_${data.file_name}.${data.file_type}`;
        const result = await db.query(query.uploadAttachment, [data.task_id, data.file_name , filePath , data.file_type , data.member_id]);
        const worker_url = new url(process.env.Worker_Url);
        worker_url.searchParams.set('expires', Date.now() + 3*60*1000);
        worker_url.searchParams.set('file_name',data.file_name);
        worker_url.searchParams.set('attachment_id',result.rows[0].attachment_id);
        worker_url.searchParams.set('file_hash',data.file_hash);
        worker_url.searchParams.set('key',data.filePath);
        const hmac = crypto.createHmac('sha256' , process.env.Url_Secret);
        //console.log(worker_url.href);
        hmac.update(worker_url.href);
        worker_url.searchParams.set('sig' , hmac.digest('hex'));
        res.status(200).json({success : true , message : "link sent" , data : {worker_url : worker_url.href} });
    }
    catch (error) { 
        console.log(`${error.code}`);
        console.log(`${error}`);
        // 1. Handle Duplicates (e.g., Email already exists)
        if (error.code === '23505') {
            // Postgres error details often look like: "Key (email)=(bob@test.com) already exists."
            // You can parse this or just send a generic message.
            res.status(409).json({
                success: false,
                message: "This record already exists (e.g., email or username taken)."
            });
        }
        // 2. Handle Invalid References (e.g., Invalid Project ID)
        else if (error.code === '23503') {
            res.status(400).json({
                success: false,
                message: "Invalid reference. The item you are linking to does not exist."
            });
        }
        // 3. Handle Missing Data
        else if (error.code === '23502') {
            res.status(400).json({
                success: false,
                message: "Missing required field."
            });
        }
        // 4. Catch-All for everything else (Syntax errors, DB crashes)
        else{
            res.status(500).json({
            success: false,
            message: "Internal Server Error. Please try again later."
            });
        }
    }
}

module.exports = deleteMember;