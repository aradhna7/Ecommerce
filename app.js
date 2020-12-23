const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();

//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

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

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use('/api' , authRoutes);
app.use('/api' , userRoutes);
app.use('/api' , categoryRoutes);
app.use('/api' , productRoutes);
app.use('/api' , braintreeRoutes);
app.use('/api' , orderRoutes);


if(process.env.NODE_ENV === 'production')
{
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

// const port = process.env.PORT || 8000;

// app.listen(port, ()=>{
//     console.log(`server is running at ${port}`);
// })
const port = process.env.PORT || 8000;

app.listen(port, () => {	
    console.log(`Server running on port ${port}`);	   
})