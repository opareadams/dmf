exports.registerAdmin = (req, res) =>  {
    res.json({ message: 'hooray!A list of orders' });   
};


exports.register = (req, res) =>  {
    res.json({ message: 'hooray! A list of 5 top orders' });   
};


exports.login = (req, res) =>  {
    res.json({ message: 'hooray! An order details' });   
};

exports.logout = (req, res) =>  {
    res.json({ message: 'hooray! A list of orders with limit' });   
};