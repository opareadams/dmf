"use strict";

const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../app/models/user');
const orderController = require('../app/controllers/orderController');
const authController = require('../app/controllers/authController');
const registerController = require('../app/controllers/registerController');
const riderController = require('../app/controllers/riderController');

// Middlewares
// =============================================================================
const protectedRoute = function (req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'dmf-api-backend', function (err, payload) {
            if (payload) {
                User.findById(payload.userId).then(
                    (userDetails) => {
                        req.user= userDetails;
                        next()
                    }
                )
            } else {
               next()
            }
        })
    }catch(e){
        const err = new Error(`Authentication Error`);
        err.status = false;
        next(err);
    }
}


const adminRoute = function (req, res, next) {
    try{
       if (req.user.role == 'admin') {
           next();
       } else {
        const err = new Error(`Access Denied`);
        err.status = false;
        next(err);
       }
    }catch(e){
        const err = new Error(`Authentication Error`);
        err.status = false;
        next(err);
    }
}

// Registration & Authentication  Routes
// =============================================================================

// POST /api/register
// Register a User
router.post('/register', registerController.register);

// GET /api/users
//List all Users
router.get('/users', [protectedRoute,adminRoute], registerController.index);

// POST /api/login
// Login User
router.post('/auth/login', authController.login);

// POST /api/logout
// Logout User
router.post('/auth/logout', protectedRoute, authController.logout);




// Order Routes
// =============================================================================

// GET /api/orders/summary
// List summary for entire Orders
router.get('/orders/summary', protectedRoute, orderController.orderSummary); 

// GET /api/orders/top/5
// List top 5 Orders for the day
router.get('/orders/top/5', protectedRoute, orderController.indexTopOrders); 

// GET /api/orders/:orderId
// Get details of specific order
router.get('/orders/:orderId', protectedRoute, orderController.findOrder); 

// GET /api/orders/:status
// Get lists of all order by status
router.get('/orders/status/:status', protectedRoute, orderController.filterByStatus); 

// GET /api/orders/limit/:limit
// List a specific number of orders
router.get('/orders/limit/:limit',protectedRoute, orderController.indexOrdersWithLimit); 

// POST /api/orders/:orderID/status/:status
// Update order status
router.post('/orders/:orderId',protectedRoute, orderController.updateOrderStatus); 

// POST /api/orders/:orderID/packaged
// Update order packaged flag to true
router.post('/orders/:orderId/packaged',protectedRoute, orderController.packagedOrderStatusUpdate); 

// GET /api/orders
// list all orders
router.get('/orders/:page?/:limit?', protectedRoute, orderController.index); 

module.exports = router;


// Riders Routes
// =============================================================================

// POST /api/rider
// Register a Rider
router.post('/rider', protectedRoute, riderController.register);

// POST /api/rider/delete
// Delete a Rider
router.post('/rider/delete', protectedRoute, riderController.delete);

// GET /api/users
//List all Riders
router.get('/riders', protectedRoute, riderController.index);
