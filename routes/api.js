"use strict";

const express = require("express");
const router = express.Router();
const orderController = require('../app/controllers/orderController');
const authController = require('../app/controllers/authController');


// Registration & Authentication  Routes
// =============================================================================

// POST /api/register/admin
// Register an Administrative User
router.post('/register/admin', authController.registerAdmin);

// POST /api/register
// Register a normal  User
router.post('/register', authController.register);

// POST /api/login
// Login User
router.post('/login', authController.login);

// POST /api/logout
// Logout User
router.post('/logout', authController.logout);



// Order Routes
// =============================================================================

// GET /api/orders
// list all orders
router.get('/orders', orderController.index); 

// GET /api/orders/top/5
// List top 5 Orders for the day
router.get('/orders/top/5', orderController.indexTopOrders); 

// GET /api/orders/:orderId
// Get details of specific order
router.get('/orders/:orderId', orderController.findOrder); 

// GET /api/orders/limit/:limit
// List a specific number of orders
router.get('/orders/limit/:limit', orderController.indexOrdersWithLimit); 

module.exports = router;
