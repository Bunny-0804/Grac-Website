//Get dotenv file
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'../.env')});

const { Pool } = require('pg');
const pool = new Pool(
    {
        user: 'jeevan',
        host: 'localhost',
        database: 'grac_db',
        password: process.env.Db_password,
        port:process.env.db_port,

        max: process.env.pool_connection_limit,
        idleTimeoutMillis: 180000, //How long a connection stays active after initiation before closing
        connectionTimeoutMillis: 50000 
    }
);

module.exports = {
    //export a wrapper function query to access a pool.query('sql',sql_parameter_array).
    //the function returns a implicit promise. its default behaviour is of a async function just like pool.query()
    query: (text , params) => pool.query(text , params),
    pool: pool
};

