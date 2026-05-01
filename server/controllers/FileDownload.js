const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const fileDownload = async (req, res) => {   
    try { 
        const command = new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: req.body.file_url,
        });

        // Link expires in 900 seconds (15 minutes)
        const url = await getSignedUrl(s3, command, { expiresIn: 5*60 });

        res.status(200).json({ success: true, download_url: url });
    } catch (error) {
        res.status(500).json({ success: false, message: "Could not generate link" });
    }
};

module.exports = fileDownload;