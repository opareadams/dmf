"use strict";

const express = require("express");
const router = express.Router();
const orderController = require('../app/controllers/orderController');
const authController = require('../app/controllers/authController');


//var Form = require("../models/formModels").Form;
//var Form2 = require("../models/formModels").Form2;
//var ldap = require("../models/ldapModel");


// Registration & Authentication  Routes
// =============================================================================

// POST /api/register/admin
//Register an Administrative User
router.post('/register/admin', authController.registerAdmin);

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);


// Order Routes
// =============================================================================
router.get('/orders', orderController.index); 

router.get('/orders/top/5', orderController.indexTopOrders); 

router.get('/orders/:orderId', orderController.findOrder); 

router.get('/orders/limit/:limit', orderController.indexOrdersWithLimit); 

module.exports = router;
