const path = require('path');
const db = require(path.resolve(__dirname, '../pool.js'));
const query = require(path.resolve(__dirname, '../queries/task_table.js'));
const { S3Client, PutObjectCommand } =  require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config({ path: path.resolve(__dirname, './../../.env') });

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_access_key,
  },
});

const uploadAttachment = async (req, res) => {
    try {
        //specify file directory
        const filePath = `${req.body.member_id}/${Date.now()}_${req.body.file_name}.${req.body.file_type}`;
        const result = await db.query(query.uploadAttachment, [req.body.task_id, req.body.file_name , req.body.file_type , req.body.member_id]);
        const cmd = new PutObjectCommand({
            Bucket: process.env.bucket_name,
            Key: filePath,
            ContentType: req.body.file_type ,
            Metadata: {"security_status": "secure" , "hash" : req.body.file_hash}
        });
        const tempUrl = await getSignedUrl(r2, cmd, { expiresIn: 1500 });
        res.status(200).json({success : true , message : "attachment upload request accepted" , tempUrl : tempUrl});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({success : false , message : "Internal Server error"});
    }
};

module.exports = uploadAttachment;