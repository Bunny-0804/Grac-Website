const path = require('path');
const db = require(path.resolve(__dirname, '../pool.js'));
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const LogOut =  (req, res) => {
    try 
    {
        res.clearCookie('authorization',{httpOnly: true , secure : true , sameSite : 'Strict' , maxAge : 15*60*1000});    
        res.status(200).json({success : true , message : "Logged Out successfully"});
    }
    catch (error) {
        console.log(`${error.code}`);
        console.log(`${error}`)
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
        else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error. Please try again later."
            });
        }
    }
}

module.exports = LogOut;