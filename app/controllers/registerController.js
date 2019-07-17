const User = require('../models/user');

//Register a new User
exports.register = (req, res) =>  {
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role:   req.body.role,
        roleId: req.body.role_id,
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


// list all users
exports.index = (req, res) => {
    User.find({})
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

