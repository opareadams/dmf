exports.registerAdmin = function(req, res) {
    res.json({ message: 'hooray!A list of orders' });   
};


exports.register = function(req, res) {
    res.json({ message: 'hooray! A list of 5 top orders' });   
};


exports.login = function(req, res) {
    res.json({ message: 'hooray! An order details' });   
};

exports.logout = function(req, res) {
    res.json({ message: 'hooray! A list of orders with limit' });   
};