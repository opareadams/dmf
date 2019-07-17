const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.login = (req, res) =>  {
    User.findOne({email:req.body.email})    
    .select('+password')
    .then((user) => {
        user.validatePassword(req.body.password,(err, isMatch) => {
            if(isMatch){
                const token = jwt.sign({userId:user.id}, 'dmf-api-backend');
                res.status(200)
                .json({
                    status: true,
                    message: 'User logged in successfully',
                    data: {
                        user_id:user.id,
                        username:user.username,
                        email:user.email,
                        role:user.role,
                        role_id:user.roleId,
                        token
                    }                    
                })
            }
            else{
                res.status(401)
                .json({
                    status: false,
                    message:'Invalid Password/Username'
                });
            }
        })
    })
    .catch((err)=>{
        res.status(401).json({message:'Invalid Password/Username'});
    })
};

exports.logout = (req, res) =>  {
    res.json({ message: 'hooray! User Loged Out' });   
};

// Update User Password
exports.updatePassword = (req, res) => {
    if (req.user) {
        User.findOne({email:req.user.email})    
        .select('+password')
        .then((user) => {
            user.validatePassword(req.body.old_password,(err, isMatch) => {
                console.log(user)
                if(isMatch){
                    bcrypt.hash(req.body.new_password,10).then((hashedPassword) => {
                        user.password = hashedPassword; 

                        user.save((err) => {
                            if (err) {
                                console.log(err);
                                res.statusCode = 500;
                                res.json({ 
                                    status: false,
                                    message: `Oops! An error occured. Error: ${err}`
                                }); 
                            }
                            user.password = '*******';
                            res.statusCode = 201;
                            res.json({ 
                                status: true,
                                message: 'hooray! User Saved!',
                                user
                            });   
                          }); 
                    })
                     
                } else{
                    res.status(401)
                    .json({
                        status: false,
                        message:'Old password does not match'
                    });
                }
            })
        })
        .catch((err)=>{
            res.status(401).json({message:'Invalid User'});
        })

    }

    

    
    
};