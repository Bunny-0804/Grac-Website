const path = require('path');
const https = require('https');
const express = require('express');
const fs = require('fs');

//const adminRouter = require(path.resolve(__dirname,'./routers/adminRouter.js'));
const memberRouter = require(path.resolve(__dirname,'./routers/memberRouter.js'));
const userRouter = require(path.resolve(__dirname,'./routers/userRouter.js'));

const app = express();
const port = process.env.env_port;

app.use(express.json());

/*app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    next();
});
*/

//app.use('/admin',adminRouter);
app.use('/api/member',memberRouter);
app.use('/api/user',userRouter);

const ssServer = https.createServer({ 
    key: fs.readFileSync(path.resolve(__dirname,'./certificates/localhost+1-key.pem')) ,
    cert: fs.readFileSync(path.resolve(__dirname,'./certificates/localhost+1.pem')) } , app);
    
ssServer.listen(port, ()=> {console.log(`Server is running on port ${port}`)});

