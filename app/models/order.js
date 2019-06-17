"use strict";

const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

// Order Schema ,unique:true
// =============================================================================
const orderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true },
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
  delivered: { type: Boolean, default: false },
  cartHash: String,
  metaData: Array,
  lineItems: Array,
  taxLines: Array,
  lineItems: Array,
  shippingLines: Array,
  feeLines: Array,
  couponLines: Array,
  refunds: Array,
  zone: String,
  rider: Array,
  cashCollectedFromRider: String,
  deliveryDate: { type: String, required: true },
  assignedAt: Date,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

// Set new date for updatedAt on every update
orderSchema.method("update", function (updates, callback) {
  const order = this;
  Object.assign(order, updates, { updatedAt: new Date() });
  order.parent().save(callback);
});

orderSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Order', orderSchema);
