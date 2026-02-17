const path = require('path');
//const adminRouter = require(path.resolve(__dirname,'./routers/adminRouter.js'));
const memberRouter = require(path.resolve(__dirname,'./routers/memberRouter.js'));
const userRouter = require(path.resolve(__dirname,'./routers/userRouter.js'));
const express = require('express');
const app = express();
const port = process.env.env_port;

app.listen(port, ()=> {console.log(`Server is running on port ${port}`)});

app.use(express.json());

/*app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    next();
});
*/

//app.use('/admin',adminRouter);
app.use('/api/member',memberRouter);
app.use('/api/user',userRouter);