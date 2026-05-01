const path = require('path');
const https = require('https');
const express = require('express');
const cors = require('cors')
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config({path : path.resolve(__dirname , '../.env')});

const adminRouter = require(path.resolve(__dirname,'./routers/adminRouter.js'));
const memberRouter = require(path.resolve(__dirname,'./routers/memberRouter.js'));
const userRouter = require(path.resolve(__dirname,'./routers/userRouter.js'));

const corsPolicy = {
    origin : "https://localhost:5173" , 
    methods : "GET , POST" , 
    allowedHeaders : [ 'Content-Type' , 'authorization'] , 
    credentials : true
}

const app = express();
app.use(cors(corsPolicy));
const port = process.env.env_port;


app.use(express.json());
app.use(cookieParser());

/*app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    next();
});
*/

const authenticate = (req,res,next) => {
    const token = req.cookies.Authorization;
    if(!token)
    {
        res.status(401).json({success: false , message : "session token not found"});
    }
    else
    {
        jwt.verify(token , process.env.jwt_key , (error , decoded) => {
            if(error)
            {
                console.log(error);
                if(error.name === 'TokenExpiredError')
                {
                    res.status(401).json({success : false , message : "Token Expired" });
                    return;
                }
                else
                {
                    res.status(401).json({success : false , message : "Invalid or Tampered Token"});
                    return;
                }
            }
            else
            {
                req.user = decoded;
                next();
            }
        });
    }
    
}

//console.log("Reached primary router");
app.use('/api/user',userRouter);
app.use('/api/member', authenticate , memberRouter);
app.use('/api/admin' , authenticate , adminRouter);
//console.log("Primary router executed");

const ssServer = https.createServer({ 
    key: fs.readFileSync(path.resolve(__dirname,'./certificates/localhost-key.pem')) ,
    cert: fs.readFileSync(path.resolve(__dirname,'./certificates/localhost.pem')) } , app);
    
ssServer.listen(port, ()=> {console.log(`Server is running on port ${port}`)});

