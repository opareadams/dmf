"use strict";

const express = require('express');
const bodyParser = require('body-parser');
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
app.use((req, res, next) => {
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

// ANY /api/*
// Route to api endpoints 
app.use("/api", apiRoutes);

// POST /webhook
// Route to recieve webhook data
router.post('/webhook', webhookController.parseWebhook);

// GET /
// Home route for tests
router.get('/', (req, res) =>  {
    res.json({ message: 'hooray!' });   
});



/**
 * MongoDB Connection
 */

mongoose.connect("mongodb://192.64.116.204:27017/dmf", {useCreateIndex: true,useNewUrlParser: true});
const db = mongoose.connection;

db.on("error", (err) => {
    console.error("connection error:", err);
});

db.once("open", () => {
    console.log("db connection successful");
});
  

//Middleware to check invalid routes
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = false;
    next(err);
});

//Middleware for server errors
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    .json({
    error: {
        status: err.status,
        message: err.message
    }
    });
});


// START THE SERVER
// =============================================================================
let server = app.listen(port, () => {
    console.log('Express server listening on port ' + port)
});