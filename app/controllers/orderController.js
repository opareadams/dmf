"use strict";

const Order = require('../models/order');
const moment = require("moment");

// Order Controller Methods
// =============================================================================

// list all orders
exports.index = (req, res) => {
    // aggregate Query
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 15,
        sort: { createdAt: -1 },
        customLabels: {
            totalDocs: 'totalOrders',
            docs: 'orders',
            limit: 'ordersPerPage',
            page: 'currentPageNumber',
            nextPage: 'next',
            prevPage: 'prev',
            totalPages: 'totalPages',
            hasPrevPage: 'hasPrev',
            hasNextPage: 'hasNext',
            pagingCounter: 'pageCounter'
        }
    };

    Order.aggregatePaginate(Order.aggregate(), options)
        .then(function(data) {
            res.json({ 
                status: true,
                meta: {
                },
                message: 'orders retrieved successfully',
                data    
            });     
        })
        .catch((err) => { 
            console.log(err);
            res.statusCode = 500;
            res.json({ 
                status: false,
                message: `Oops! An error occured. Error: ${err}`
            }); 
        });
};

// List top 5 Orders for the day
exports.indexTopOrders = (req, res) =>  {
    Order.find({
        "deliveryDate": moment().format('DD-MM-YYYY'),
        "packaged": false,
        "status":{$ne:"cancelled"}
    })
    .then((data) => {
        if (data.length) {
            res.statusCode = 200;
            res.json({ 
                status: true,
                meta: {
                    total_orders: data.length
                },
                message: 'orders retrieved successfully',
                data    
            });   
        } else {
            res.statusCode = 200;
            res.json({ 
                status: false,
                message: `No orders available for today`
            }); 
        }
        
    })
    .catch((err) => {
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
    .then((data) => { 
        if (data.length) {
            res.statusCode = 200;
            res.json({ 
                status: true,
                message: 'order retrieved successfully',
                data
            }); 
        } else {
            res.statusCode = 404;
            res.json({ 
                status: false,
                message: `No such order exist`
            }); 
        } 
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.json({ 
            status: false,
            message: `Oops! An error occured. Error: ${err}`
        }); 
    })    
};

// List a specific number of orders
exports.indexOrdersWithoutLimit = (req, res) =>  {
    Order.find({})
    .then((data) => {
        if (data.length) {
            console.log(data);
            res.statusCode = 200;
            res.json({ 
                status: true,
                message: 'orders retrieved successfully',
                data
            });   
        } else {
            res.statusCode = 404;
            res.json({ 
                status: false,
                message: `No orders available `
            }); 
        }
       
    })
    .catch((err) => {
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
    Order.find({
        "status": req.params.status
    })
    .then((data) => {
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
    .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.json({ 
            status: false,
            message: `Oops! An error occured. Error: ${err}`
        }); 
    })  
};


// Update Order status  
exports.updateOrderStatus = (req, res) =>  {
    Order.findOneAndUpdate(
        {orderId: req.params.orderId}
        ,{$set:{status:req.body.status}}
        ,{new:true}
    )
    .then((data) => {
        if(data) {
            res.statusCode = 200;
            res.json({ 
                status: true,
                message: 'Order Updated Successfully! ',
                data
            }); 
        } else {
            res.statusCode = 500;
            res.json({ 
                status: false,
                message: `no such order exist`
            }); 
        }         
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.json({ 
            status: false,
            message: `Oops! An error occured. Error: ${err}`
        }); 
    })
};

// Update Order packaged flag   
exports.packagedOrderStatusUpdate = (req, res) =>  {
    Order.findOneAndUpdate(
        {orderId: req.params.orderId,"packaged": false}
        ,{$set:{packaged:true,updatedAt:moment().format('YYYY-MM-DDTHH:mm:ss.SSS')}}
        ,{new:true}
    )
    .then((data) => {
        if(data) {
            res.statusCode = 200;
            res.json({ 
                status: true,
                message: 'Order Status Updated Successfully! ',
                data
            }); 
        } else {
            res.statusCode = 500;
            res.json({ 
                status: false,
                message: `no such order exist`
            }); 
        }         
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.json({ 
            status: false,
            message: `Oops! An error occured. Error: ${err}`
        }); 
    })
};

// Get Order Summaary  
exports.orderSummary = (req, res) =>  {    
    Order.aggregate([
        {
            $group:{
            _id:{status:"$status"},
            count:{$sum:1},
            total_amount: { $sum: {"$toDouble": "$total"}}
            }
        }
        ]).then(function (data) {
            res.json({ 
                status: true,
                message: 'summary retrieved successfully',
                data    
            }); 
        })
        .catch((err) => { 
            console.log(err);
            res.statusCode = 500;
            res.json({ 
                status: false,
                message: `Oops! An error occured. Error: ${err}`
            }); 
        });
};


// Assign Rider to order  
exports.assignRider = (req, res) =>  {
    Order.findOneAndUpdate(
        {orderId: req.params.orderId}
        ,{$set:{rider:{
            id: req.body.id,
            name: req.body.name,
            telephone: req.body.telephone,
            },
            assignedAt:moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
        }}
        ,{new:true}
    )
    .then((data) => {
        if(data) {
            res.statusCode = 200;
            res.json({ 
                status: true,
                message: 'Order assigned Successfully! ',
                data
            }); 
        } else {
            res.statusCode = 500;
            res.json({ 
                status: false,
                message: `no such order exist`
            }); 
        }         
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.json({ 
            status: false,
            message: `Oops! An error occured. Error: ${err}`
        }); 
    })
};


//Get Packaged Orders for the day
exports.packagedOrders = (req, res) =>  {
    Order.find({
        "deliveryDate": moment().format('DD-MM-YYYY'),
        "packaged": true,
        "status":{$ne:"cancelled"}
    })
    .then((data) => {
        if (data.length) {
            res.statusCode = 200;
            res.json({ 
                status: true,
                meta: {
                    total_orders: data.length
                },
                message: 'Packaged Orders retrieved successfully',
                data    
            });   
        } else {
            res.statusCode = 200;
            res.json({ 
                status: false,
                message: `No packaged orders available for today`
            }); 
        }
        
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.json({ 
            status: false,
            message: `Oops! An error occured. Error: ${err}`
        }); 
    })  
};