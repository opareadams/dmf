"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// User Schema
// =============================================================================
const userSchema = new mongoose.Schema({
    username: String,
    email: {type:String,unique:true},
    password: { type: String, select: false },
    role:String,
    roleId: Number,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});


/**
 * Hash Users password before saving
 * NB: Hashing only occurs when password is changed/modified
 */
userSchema.pre('save', function (next) {
    const user = this;
    if (!this.isNew || !user.isModified('password')) { return next();}
    bcrypt.hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, (err) => {
    next(err)
})


// Set new date for updatedAt on every update
userSchema.method("update", function (updates, callback) {
    const user = this;
    Object.assign(user, updates, { updatedAt: new Date() });
    user.parent().save(callback);
});


// Method to Validate User Password
userSchema.methods.validatePassword = function (candidatePassword,next) {    
    bcrypt.compare(candidatePassword,this.password,(err,isMatch) =>{
        if(err) {return next(err);}
        next(null,isMatch)
    });
}

module.exports = mongoose.model('User', userSchema);
