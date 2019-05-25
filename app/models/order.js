"use strict";

const mongoose = require('mongoose');

// Order Schema
// =============================================================================

const OrderSchema = new mongoose.Schema({
    orderId: Number,
    parentID: Number,
    number: String,
    orderKey: String,
    createdVia: String,
    version: String,
    status: String,
    currency: String,
    discountTotal: String,
    discountTax: String,
    shippingTotal: String,
    shippingTax: String,
    cartTax: String,
    total: String,
    totalTax: String,
    pricesIncludeTax: { type: Boolean, default: false },
    customerId: Number,
    customerIpAdress: String,
    customerNote: String,
    billing: Array,
    shipping: Array,
    paymentMethod: String,
    paymentMethodTitle: String,
    transactionId: String,
    datePaid: Date,
    packaged: { type: Boolean, default: false },
    cartHash: String,
    metaData: Array,
    lineItems: Array,
    taxLines: Array,
    lineItems: Array,
    shippingLines: Array,
    feeLines: Array,
    couponLines: Array,
    refunds: Array,
    deliveryDate: String,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
  });

// Set new date for updatedAt on every update
OrderSchema.method("update", (updates, callback) => {
    Object.assign(this, updates, { updatedAt: new Date() });
    this.parent().save(callback);
});

module.exports = mongoose.model('Order', OrderSchema);
