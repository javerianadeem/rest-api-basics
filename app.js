const express = require('express');
const app = express(); // utilities
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://javerianadeem:'+ process.env.MONGO_ATLAS_PW + '@cluster0-bph8w.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    // useMongoClient: true
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({});
    }
    next();
});

// SERVER IS STARTING using this
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// if you reach this route it means no route was able to handle the request

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})
// erorr thrown from anywhere in the application
app.use((error, req, res, next) => {
    res.status(error.status || 500); // 500 for all upper kinds of errors
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
