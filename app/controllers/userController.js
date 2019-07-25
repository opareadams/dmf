const User = require('../models/user');

//Create user
exports.register = (req, res) =>  {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role:   req.body.role,
        roleId: req.body.roleId,
    });

    newUser.save((err) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.json({ 
                status: false,
                message: `Oops! An error occured. Error: ${err}`
            }); 
        }
        newUser.password = '*******';
        res.statusCode = 201;
        res.json({ 
            status: true,
            message: 'hooray! User Saved!',
            newUser
        });   
      });  
};

// Delete User
exports.delete = (req, res) =>  {
    User.deleteOne({ _id: req.body.user_id })
        .then(() => {
            res.statusCode = 200;
            res.json({ 
                status: true,
                message: 'User deleted successfully'
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

// Update User
exports.update = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.body.user_id}
        ,{$set:{
            username: req.body.username,
            email: req.body.email,
            role:   req.body.role
        }}
        ,{new:true}
    )
    .then((data) => {
        if(data) {
            res.statusCode = 200;
            res.json({ 
                status: true,
                message: 'User updated Successfully! ',
                data
            }); 
        } else {
            res.statusCode = 500;
            res.json({ 
                status: false,
                message: `No such user exist`
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


// list all users
exports.index = (req, res) => {
    User.find({})
        .select('+roleId')
        .then((data) => {
            console.log(data);
            res.statusCode = 200;
            res.json({ 
                status: true,
                meta: {
                    total_users: data.length
                },
                message: 'Users retrieved successfully',
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

