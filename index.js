"use strict";

const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
const webhookController = require('./app/controllers/webhookController');

const app = express();
const router = express.Router();
const port = process.env.PORT || 9090;


/**
 * Middlewares
 */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

app.use(router)

// CORS middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,Authorization, X-Requested-With, Content-Type, Accept"
    );
    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE");
      return res.status(200).json({});
    }
    next();
});


// ROUTES FOR OUR API
// =============================================================================
app.use("/api", apiRoutes);

router.get('/webhook', webhookController.parseWebhook);

router.get('/', function (req, res) {
    res.json({ message: 'hooray!' });   
});



/**
 * MongoDB Connection
 */
/*
mongoose.connect("mongodb://@192.64.116.204");
     
const db = mongoose.connection;

db.on("error", function(err) {
    console.error("connection error:", err);
});

db.once("open", function() {
    console.log("db connection successful");
});
  */

//Middleware to check invalid routes
app.use(function(req, res, next) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

//Middleware to check for server errors
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
    error: {
        status: err.status,
        message: err.message
    }
    });
});


// START THE SERVER
// =============================================================================
let server = app.listen(port, function() {
    console.log('Express server listening on port ' + port)
});