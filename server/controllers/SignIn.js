const path = require('path');
const db = require(path.resolve(__dirname, '../pool.js'));
const query = require(path.resolve(__dirname, '../queries/members_table.js'));
const bcrypt = require('bcrypt');

const SignIn = async (req, res) => {
    try 
    {
        const req_data = req.body;
        const result = await db.query(query.getMember_id, [req_data.member_roll_no]);
        if (result.rowCount == 0) 
        {
            res.status(404).json({ success: false, message: "No user found" });
        }
        else 
        {
            if (await bcrypt.compare(req_data.password, result.rows[0].password_hash)) 
            {
                res.status(200).json({ success: true, message: "valid password", data: { member_id: result.rows[0].member_id } });
            }
            else 
            {
                res.status(401).json({ success: false, message: "Invalid password" });
            }
        }
    }
    catch (error) 
    {
        console.log(error.code);
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server issue" });
    }
}

module.exports = SignIn;