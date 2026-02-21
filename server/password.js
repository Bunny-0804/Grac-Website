//Just to check for data

const db = require('./pool.js');
const bcrypt = require('bcrypt');

const pass_hash = async() => {
    try
    {
        const pool = db.pool;
        await pool.query('BEGIN');
        //transaction begin
        for(i = 0; i < 25; i++)
        {
            const pass = "hash" + i;
            const password = await bcrypt.hash(pass , 10);
            await pool.query(`UPDATE club_member SET password_hash = ($1) WHERE member_id = ($2)`,[password,i+1]);
        }
        await pool.query('COMMIT');
        console.log("passwords hashed");
        return;
    }
    catch(error)
    {
        await pool.query('ROLLBACK');
        console.log(error.code);
        console.log(error);
        return;
    }
}

pass_hash();