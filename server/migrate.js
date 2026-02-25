const { Client } = require('pg')
const fs = require('fs')
const path = require('path');
const { CONNREFUSED } = require('dns');

const client = new Client({
    connectionString: 'postgresql://jeevan:DumbPassword123@localhost:5432/grac_db',
    connectionTimeoutMillis:5000,
    query_timeout:10000
});

async function migrate() {
    //try catch for database connection error
    try{
        await client.connect();
        console.log("Connected to database");
        
        //creates a table _migrations if table doesnt exist
        await client.query(`CREATE TABLE IF NOT EXISTS _migrations  (id SERIAL PRIMARY KEY ,
                                                                    fileName VARCHAR(155) NOT NULL,
                                                                    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
        
        //creates a files array and sorts it from migrations folder
        const migrations = path.join(__dirname,'..','database','migrations');
        const files = fs.readdirSync(migrations).sort();
        const {rows:executed} = await client.query(`SELECT fileName FROM _migrations`);
        //Takes the executed array and creates a Hashset for efficient lookup
        const executed_set = new Set(executed.map(row => row.filename));
        for(const file of files)
        {
            if(!executed_set.has(file) && file.endsWith('.sql'))
            {
                console.log(`Running Migration file ${file}`);
                const file_path = path.join(migrations,file);
                const file_sql = fs.readFileSync(file_path , 'utf-8');// read content from files

                //Transaction block to indicate a start of transaction
                await client.query('BEGIN');
                try
                {
                    await client.query(file_sql);
                    await client.query('INSERT INTO _migrations (fileName) VALUES ($1)', [file]);
                    await client.query('COMMIT');
                    console.log(`${file} file execution successfull`);   
                }
                catch(error)
                {
                    await client.query('ROLLBACK');
                    console.log(`${file} file execution failed.`);
                    console.log(`Error name: ${error.name}`);
                    console.log(`Error code: ${error.code}`);
                    console.log(`Error message: ${error.message}`);
                    console.log(error);
                    console.log(`Exiting program , relaunch to try again`);
                    await client.end();
                    process.exit(1);
                }
            }
        }
        console.log("All migrations are upto date");
    }
    catch(error)
    {
        console.log(`Error name: ${error.name}`);
        console.log(`Error content: ${error.message}`);
        //console.log("Connection timeout , couldnt connect to the database");
    }
    finally
    {
        await client.end();
    }
}

migrate();