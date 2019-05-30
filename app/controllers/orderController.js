"use strict";

const Order = require('../models/order');
const moment = require("moment");

// Order Controller Methods
// =============================================================================

// list all orders
exports.index = (req, res) => {
    Order.find({})
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
                res.statusCode = 404;
                res.json({ 
                    status: false,
                    message: `No orders available`
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

// List top 5 Orders for the day
exports.indexTopOrders = (req, res) =>  {
    Order.find({
        "deliveryDate": moment().format('DD-MM-YYYY'),
        "packaged": false
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
            res.statusCode = 404;
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
exports.indexOrdersWithLimit = (req, res) =>  {
    const limit = Number(req.params.limit);
    Order.find({})
    .limit(limit)
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
        {orderId: req.params.orderId}
        ,{$set:{packaged:true}}
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


// Update Order    
exports.updateOrder = (req, res) =>  {
    Order.findOneAndUpdate(
        {orderId: req.body.id}
        ,{$set:{status:'cancelled'}}
        ,{new:true}
    )
    .then((data) => { 
        if (data) {
            const newOrder = new Order({
                orderId: req.body.id,
                parentID: req.body.parent_id,
                number: req.body.number,
                orderKey: req.body.order_key,
                createdVia: req.body.created_via,
                version: req.body.version,
                status: req.body.status,
                currency: req.body.currency,
                discountTotal: req.body.discount_total,
                discountTax: req.body.discount_tax,
                shippingTotal: req.body.shipping_total,
                shippingTax: req.body.shipping_tax,
                cartTax: req.body.cart_tax,
                total: req.body.total,
                totalTax: req.body.total_tax,
                pricesIncludeTax: req.body.prices_include_tax,
                customerId: req.body.customer_id,
                customerIpAdress: req.body.customer_ip_address,
                customerNote:req.body.customer_note,
                billing: req.body.billing,
                shipping: req.body.shipping,
                paymentMethod: req.body.payment_method,
                paymentMethodTitle: req.body.payment_method_title,
                transactionId: req.body.transaction_id,
                cartHash:req.body.cart_hash,
                metaData: req.body.meta_data,
                lineItems: req.body.line_items,
                taxLines: req.body.tax_lines,
                shippingLines: req.body.shipping_lines,
                feeLines: req.body.fee_lines,
                couponLines: req.body.coupon_lines, 
                refunds: req.body.refunds,
                deliveryDate: getDeilveryDate(req.body.meta_data) 
            });

            newOrder.save((err) => {
                if (err) {
                    console.log(err);
                    res.statusCode = 500;
                    res.json({ 
                        status: false,
                        message: `Oops! An error occured. Error: ${err}`
                    }); 
                }
                res.statusCode = 201;
                console.log('Document is successfully saved.');
                res.json({ message: 'hooray! Order Saved!' });   
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