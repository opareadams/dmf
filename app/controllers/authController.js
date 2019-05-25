const jwt = require('jsonwebtoken');

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
                res.status(400)
                .json({
                    status: false,
                    message:'Invalid Password/Username'
                });
            }
        })
    })
    .catch((err)=>{
        res.status(400).json({message:'Invalid Password/Username'});
    })
};

exports.logout = (req, res) =>  {
    res.json({ message: 'hooray! A list of orders with limit' });   
};