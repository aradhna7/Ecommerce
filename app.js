const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//import routes
const userRoutes = require('./routes/user');

//app
const app = express();

//database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=> 
    console.log('DB Connected')
)


//routes middleware
app.use(userRoutes);


const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`server is running at ${port}`);
})