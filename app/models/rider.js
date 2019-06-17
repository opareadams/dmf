"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// User Schema
// =============================================================================
const riderSchema = new mongoose.Schema({
    name: {type:String, unique:true},
    telephone: {type:String, unique:true},
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});


// Set new date for updatedAt on every update
riderSchema.method("update", function (updates, callback) {
    const user = this;
    Object.assign(user, updates, { updatedAt: new Date() });
    user.parent().save(callback);
});


module.exports = mongoose.model('Rider', riderSchema);
