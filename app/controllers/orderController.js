"use strict";

const Order = require('../models/order');
const moment = require("moment");

// Order Controller Methods
// =============================================================================

// list all orders
exports.index = (req, res) => {
    Order.find({})
        .then((data)=>{
            console.log(data);
            res.statusCode = 200;
            res.json({ 
                status: true,
                meta: {
                    total_orders: data.length
                },
                message: 'orders retrieved successfully',
                data
            });   
        })
        .catch((err)=>{
            console.log(err);
            res.statusCode = 500;
            res.json({ 
                status: false,
                message: `Oops! An error occured. Error: ${err}`
            }); 
        })
};

// List top 5 Orders for the day
exports.indexTopOrders = (req, res) =>  {
    Order.find({
        "deliveryDate": moment().format('DD-MM-YYYY'),
        "status": "processing"
    })
    .then((data)=>{
        console.log(data);
        res.statusCode = 200;
        res.json({ 
            status: true,
            meta: {
                total_orders: data.length
            },
            message: 'orders retrieved successfully',
            data
        });   
    })
    .catch((err)=>{
        console.log(err);
        res.statusCode = 500;
        res.json({ 
            status: false,
            message: `Oops! An error occured. Error: ${err}`
        }); 
    })  
};

// Get details of specific order
exports.findOrder = (req, res) =>  {
    Order.find({
        "orderId": req.params.orderId
    })
    .limit(1)
    .then((data)=>{
        console.log(data);
        res.statusCode = 200;
        res.json({ 
            status: true,
            message: 'order retrieved successfully',
            data
        });   
    })
    .catch((err)=>{
        console.log(err);
        res.statusCode = 500;
        res.json({ 
            status: false,
            message: `Oops! An error occured. Error: ${err}`
        }); 
    })    
};

// List a specific number of orders
exports.indexOrdersWithLimit = (req, res) =>  {
    const limit = Number(req.params.limit);
    Order.find({})
    .limit(limit)
    .then((data)=>{
        console.log(data);
        res.statusCode = 200;
        res.json({ 
            status: true,
            message: 'orders retrieved successfully',
            data
        });   
    })
    .catch((err)=>{
        console.log(err);
        res.statusCode = 500;
        res.json({ 
            status: false,
            message: `Oops! An error occured. Error: ${err}`
        }); 
    })     
};


// Filter Orders by Satus
exports.filterByStatus = (req, res) =>  {
    console.log(req.params.status);
    Order.find({
        "status": req.params.status
    })
    .then((data)=>{
        console.log(data);
        res.statusCode = 200;
        res.json({ 
            status: true,
            meta: {
                total_orders: data.length
            },
            message: 'orders retrieved successfully',
            data
        });   
    })
    .catch((err)=>{
        console.log(err);
        res.statusCode = 500;
        res.json({ 
            status: false,
            message: `Oops! An error occured. Error: ${err}`
        }); 
    })  
};