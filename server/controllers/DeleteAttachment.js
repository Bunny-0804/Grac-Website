const path = require('path');
const db = require(path.resolve(__dirname, '../pool.js'));
const query = require(path.resolve(__dirname, '../queries/task_table.js'));
require('dotenv').config(path.resolve(__dirname, '../../.env'));

// 1. Import AWS SDK v3 components
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

// 2. Initialize the R2 Client (Keep this outside the handler for reuse)
const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const deleteAttachment = async (req, res) => {
    const client = await db.pool.connect();
    
    try {
        const { attachment_id } = req.body;
        const { member_id, member_role } = req.user;

        await client.query('BEGIN');

        // 3. Delete from DB. Ensure your query uses: RETURNING file_key
        const result = await client.query(query.deleteAttachment, [attachment_id, member_id, member_role]);

        if (result.rowCount === 0) {
            // No record found or permission denied
            await client.query('ROLLBACK');
            return res.status(403).json({ success: false, message: "Attachment cannot be deleted" });
        }

        const fileKey = result.rows[0].file_key; 

        // 4. Delete from Cloudflare R2
        const deleteParams = {
            Bucket: process.env.R2_BUCKET_NAME,
            Key: fileKey,
        };

        try {
            await s3.send(new DeleteObjectCommand(deleteParams));
            
            // 5. If R2 succeeds, commit the DB changes
            await client.query('COMMIT');
            return res.status(200).json({ success: true, message: "Task attachment deleted successfully" });

        } catch (r2Error) {
            // If R2 fails, we rollback the DB so the database and storage stay in sync
            await client.query('ROLLBACK');
            console.error("R2 Deletion Error:", r2Error);
            return res.status(500).json({ success: false, message: "Storage deletion failed. Transaction rolled back." });
        }

    } catch (error) {
        // 6. Rollback for any other DB or code errors
        await client.query('ROLLBACK');
        console.error(`Error Code: ${error.code}`, error);

        const errorMap = {
            '23505': { status: 409, msg: "This record already exists." },
            '23503': { status: 400, msg: "Invalid reference. Item does not exist." },
            '23502': { status: 400, msg: "Missing required field." }
        };

        const { status, msg } = errorMap[error.code] || { status: 500, msg: "Internal Server Error." };
        return res.status(status).json({ success: false, message: msg });

    } finally {
        // Always release the client back to the pool
        client.release();
    }
};

module.exports = deleteAttachment;