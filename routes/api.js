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
router.post('/orders/summary', protectedRoute, orderController.orderSummary); 

// GET /api/orders/index
// List all orders with no limit
router.get('/orders/index',protectedRoute, orderController.indexOrdersWithoutLimit); 

// GET /api/orders/top/5
// List top 5 Orders for the day
router.get('/orders/top/5', protectedRoute, orderController.indexTopOrders); 

// GET /api/orders/packaged
// List Packaged for the day
router.get('/orders/packaged', protectedRoute, orderController.packagedOrders); 

// POST /api/orders/:orderId
// Assign a specific order to a rider
router.post('/orders/assign/:orderId', protectedRoute, orderController.assignRider); 

// GET /api/orders/:orderId
// Get details of specific order
router.get('/orders/:orderId', protectedRoute, orderController.findOrder); 

// GET /api/orders/:status
// Get lists of all order by status
router.get('/orders/status/:status', protectedRoute, orderController.filterByStatus); 

// POST /api/orders/:orderID/status/:status
// Update order status
router.post('/orders/:orderId',protectedRoute, orderController.updateOrderStatus); 

// POST /api/orders/:orderID/packaged
// Update order packaged flag to true
router.post('/orders/:orderId/packaged',protectedRoute, orderController.packagedOrderStatusUpdate); 

// GET /api/orders
// list all orders
router.get('/orders/:page?/:limit?', protectedRoute, orderController.index); 





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

// POST /api/users
// GET report on Rider
router.post('/rider/report', protectedRoute, riderController.riderReport);

module.exports = router;

