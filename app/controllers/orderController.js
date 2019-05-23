exports.index = function(req, res) {
    res.json({ message: 'hooray!A list of orders' });   
};


exports.indexTopOrders = function(req, res) {
    res.json({ message: 'hooray! A list of 5 top orders' });   
};


exports.findOrder = function(req, res) {
    res.json({ message: 'hooray! An order details' });   
};

exports.indexOrdersWithLimit = function(req, res) {
    res.json({ message: 'hooray! A list of orders with limit' });   
};