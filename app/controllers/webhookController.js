"use strict";

const Order = require('../models/order');

exports.parseWebhook = (req, res) => {
      
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
        deliveryDate: req.body.meta_data[3].value
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

};