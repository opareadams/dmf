"use strict";

const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain)
app.use(router)

router.get('/', function (req, res) {
    //test route
    res.send(JSON.stringify({ Hello:'World'}));
});

router.post('/api/webhook', function(req, res) {
    //recieves webhook response
});

router.post('/api/register/admin', function(req, res) {
    //registers an admin user
});

router.post('/api/register', function(req, res) {
    //registers a user
});

router.post('/api/login', function(req, res) {
    //registers a user
});

router.get('/api/orders', function(req, res) {
    //returns all orders
}); 

router.get('/api/orders/top/5', function(req, res) {
    //returns a limited number of orders
}); 

router.get('/api/orders/:orderId', function(req, res) {
    //returns specific order information 
}); 

router.get('/api/orders/limit/:limit', function(req, res) {
    //returns a limited number of orders
}); 

const port = process.env.PORT || 9090;

let server = app.listen(port, function() {
    console.log('Express server listening on port ' + port)
});