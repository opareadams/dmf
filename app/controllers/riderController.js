const Rider = require('../models/rider');
const Order = require('../models/order');
const moment = require("moment");

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


// Get a report on Rider   
exports.riderReport = (req, res) =>  {
    const startDate = moment(req.body.start_date).toDate();
    const endDate = moment(req.body.end_date).toDate();
    Order.aggregate([
        { "$match": {
                createdAt: {
                    "$gte": startDate, 
                    "$lt": endDate
                },
                "status":{$nin:["cancelled","cancelledByWoocomerce"]}
            }
        },
        {
            $group:{
                _id:"$rider",
                total_orders_assigned:{$sum:1},
                total_amount: { 
                    $sum: { 
                        "$toDouble": "$total"
                    }
                },
                total_cash_collected: {
                    $sum: {
                        "$toDouble": { "$cond": [{ "$eq": ["$paymentMethod", "cod"] }, "$total", 0] }
                    }
                },
                total_slydepay_value: {
                    $sum: {
                        "$toDouble": { "$cond": [{ "$eq": ["$paymentMethod", "slydepay"] }, "$total", 0] }
                    }
                }
            }
        }
    ])
    .then((data) => {
        if(data) {
            res.statusCode = 200;
            res.json({ 
                status: true,
                message: 'Rider report rertrieved Successfully! ',
                data
            }); 
        } else {
            res.statusCode = 500;
            res.json({ 
                status: false,
                message: `no such rider exist`
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