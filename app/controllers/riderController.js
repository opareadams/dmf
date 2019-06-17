const Rider = require('../models/rider');

//Register a new Rider
exports.register = (req, res) =>  {
    
    const newRider = new Rider({
        name: req.body.name,
        telephone: req.body.telephone
    });

    newRider.save((err) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.json({ 
                status: false,
                message: `Oops! An error occured. Error: ${err}`
            }); 
        }

        res.statusCode = 201;
        res.json({ 
            status: true,
            message: 'hooray! Rider Saved!',
            newRider
        });   
      });  
};


// list all riders
exports.index = (req, res) => {
    Rider.find({})
        .then((data) => {
            res.statusCode = 200;
            res.json({ 
                status: true,
                meta: {
                    total_riders: data.length
                },
                message: 'Riders retrieved successfully',
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

//Delete Rider 
exports.delete = (req, res) => {

      Rider.deleteOne({ _id: req.body.id })
        .then(() => {
            res.statusCode = 200;
            res.json({ 
                status: true,
                message: 'Rider deleted successfully'
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