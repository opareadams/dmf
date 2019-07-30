"use strict";

const Order = require('../models/order');
const moment = require("moment");
const Pusher = require('pusher');

/*
 * Initialise Pusher
 */
// var pusher = new Pusher({
//     appId: '830779',
//     key: 'b32078a965eb82d51eb4',
//     secret: '94edf47636a2be79fec4',
//     cluster: 'eu',
//     encrypted: true
//   });

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
    //
    Order.aggregatePaginate(Order.aggregate([
        { $match: { "status":{$ne:"cancelledByWoocomerce"} }}
    ]), options)
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
        "status":{$nin:["cancelled","cancelledByWoocomerce"]}
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

// List all orders without limits
exports.indexOrdersWithoutLimit = (req, res) =>  {
   
    Order.find({
        "status":{$ne:"cancelledByWoocomerce"}
    })
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

// List all orders between dates
exports.filterByDate = (req, res) =>  {
    const startDate = moment(req.body.start_date).toDate();
    const endDate = moment(req.body.end_date).toDate();

    Order.find({
        "createdAt": {
          "$gte": startDate, 
          "$lt": endDate
        }, 
        "status": {
          $nin: [
            "cancelledByWoocomerce"
          ]
        }
      })
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


// Update Order status  (cancel order)
exports.updateOrderStatus = (req, res) =>  {
    Order.findOneAndUpdate(
        {orderId: req.params.orderId,
        "status":{$nin:["cancelled","cancelledByWoocomerce","delivered","failed"]}
        }     
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
        {orderId: req.params.orderId,"packaged": false,
        "status":{$nin:["cancelled","cancelledByWoocomerce","delivered","failed"]}
    }
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
    const startDate = moment(req.body.start_date).toDate();
    const endDate = moment(req.body.end_date).toDate();

    Order.aggregate([
        { "$match": {
                createdAt: {
                    "$gte": startDate, 
                    "$lt": endDate
                },
                "status":{$ne:"cancelledByWoocomerce"}
            }
        },
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


// Get Donut Summaary  
exports.donutSummary = (req, res) =>  { 
    const startDate = moment(req.body.start_date).toDate();
    const endDate = moment(req.body.end_date).toDate();

    Order.aggregate([
        { "$match": {
                createdAt: {
                    "$gte": startDate, 
                    "$lt": endDate
                },
                "status":"completed"
            }
        },
        {
            $group:{
            _id:{orderId:"orderId"},
            count:{$sum:1},
            total: { $sum: {"$toDouble": "$totalDonuts"}}
            }
        }
        ]).then(function (data) {
            res.json({ 
                status: true,
                message: 'Donut summary retrieved successfully',
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
        {
        orderId: req.params.orderId,
        "status":{$nin:["cancelled","cancelledByWoocomerce"]}
        
        }
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
      //  "deliveryDate": moment().format('DD-MM-YYYY'),
        "packaged": true,
        "status":{$nin:["cancelled","cancelledByWoocomerce","delivered"]},
        // "status":{
        //     $ne:"cancelledByWoocomerce",
        //     $ne:"delivered"
        // }
    })
    .sort({updatedAt:-1})
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

//Search for an order
exports.search = (req, res) =>  {
    Order.find({orderId: req.params.query})
    .sort({updatedAt:-1})
    .then((data) => {
        console.log(data);
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
                message: `No Order found`
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