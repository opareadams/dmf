"use strict";

const Order = require('../models/order');
const Pusher = require('pusher');

/*
 * Initialise Pusher
 */
var pusher = new Pusher({
    appId: '830779',
    key: 'b32078a965eb82d51eb4',
    secret: '94edf47636a2be79fec4',
    cluster: 'eu',
    encrypted: true
  });

function getDeilveryDate (metaData) {
    let date = null;
    if (metaData.length > 2) {
        date = metaData[3].value ; //for orders created from website
    } else {
        date = metaData[0].value; //for orders created in wordpress backend
    }
    return date; 
}

function modifyStatus(status){
    let newStatus = null;
    if(status === 'processing' || status === 'completed'){
        newStatus = 'completed';
    }
    else{
        newStatus = status;
    }

    return newStatus;

}

function getTownName (townCode) {
    const towns = [
        { name: "37", code: "XX1" },
        { name: "Abbosey Okai", code: "XX2" },
        { name: "Abeka", code: "XX3" },
        { name: "Abelemkpe", code: "XX4" },
        { name: "Ablekuma", code: "XX5" },
        { name: "Abokobi", code: "XX6" },
        { name: "Accra Central", code: "XX7" },
        { name: "Accra Mall", code: "XX8" },
        { name: "Achimota", code: "XX9" },
        { name: "Adabraka", code: "XX10" },
        { name: "Adenta", code: "XX11" },
        { name: "Adjirigano", code: "XX12" },
        { name: "Agbogba", code: "XX13" },
        { name: "Agbogbloshie", code: "XX14" },
        { name: "Agege", code: "XX15" },
        { name: "Airport City", code: "XX16" },
        { name: "Airport Hills", code: "XX17" },
        { name: "Airport Residential", code: "XX18" },
        { name: "Alajo", code: "XX19" },
        { name: "Alhaji", code: "XX20" },
        { name: "Anyaa", code: "XX21" },
        { name: "Amasaman", code: "XX22" },
        { name: "Ashaiman", code: "XX23" },
        { name: "Ashaley Botwe", code: "XX24" },
        { name: "Ashongman", code: "XX25" },
        { name: "Atomic Junction", code: "XX26" },
        { name: "Asylum Down", code: "XX27" },
        { name: "Avenor", code: "XX28" },
        { name: "Awoshie", code: "XX29" },
        { name: "Awudome", code: "XX30" },
        { name: "Ayi Mensah", code: "XX31" },
        { name: "Barrier/SCC", code: "XX32" },
        { name: "Bawaleshie", code: "XX33" },
        { name: "Berekusu (Ashesi Campus)", code: "XX34" },
        { name: "Botwe", code: "XX35" },
        { name: "Bubuashie", code: "XX36" },
        { name: "Burma Camp", code: "XX37" },
        { name: "Budunburam", code: "XX38" },
        { name: "Cantoments", code: "XX39" },
        { name: "Carprice", code: "XX40" },
        { name: "Chabaa", code: "XX41" },
        { name: "Christian Village", code: "XX42" },
        { name: "Circle", code: "XX43" },
        { name: "Dansoman", code: "XX44" },
        { name: "Darkuman", code: "XX45" },
        { name: "Dome/Pillar 2", code: "XX46" },
        { name: "Dzorwulu", code: "XX47" },
        { name: "East Legon", code: "XX48" },
        { name: "East Legon Hills", code: "XX49" },
        { name: "Fadama", code: "XX50" },
        { name: "Gbawe", code: "XX51" },
        { name: "Haatso", code: "XX52" },
        { name: "High Street", code: "XX53" },
        { name: "Hong Kong", code: "XX54" },
        { name: "Industrial Area", code: "XX55" },
        { name: "James Town", code: "XX56" },
        { name: "Kanda", code: "XX57" },
        { name: "Kaneshie", code: "XX58" },
        { name: "Kasoa", code: "XX59" },
        { name: "Kisseman", code: "XX60" },
        { name: "Kokomlemle", code: "XX61" },
        { name: "Korle Bu", code: "XX62" },
        { name: "Korlegonno", code: "XX63" },
        { name: "Kotobabi - Spintex", code: "XX64" },
        { name: "Kotobabi - New Town", code: "XX65" },
        { name: "Kutunse", code: "XX66" },
        { name: "Kwabenya", code: "XX67" },
        { name: "Kwashieman", code: "XX68" },
        { name: "Labadi", code: "XX69" },
        { name: "Labone", code: "XX70" },
        { name: "Lakeside Estates", code: "XX71" },
        { name: "Lapaz", code: "XX72" },
        { name: "Lashibi", code: "XX73" },
        { name: "Laterbiokoshie", code: "XX74" },
        { name: "Legon Campus", code: "XX75" },
        { name: "Madina", code: "XX76" },
        { name: "Malejor", code: "XX77" },
        { name: "Makola", code: "XX78" },
        { name: "Mallam", code: "XX79" },
        { name: "Mamprobi", code: "XX80" },
        { name: "Mataheko", code: "XX81" },
        { name: "McCarthy Hills", code: "XX82" },
        { name: "Michelle Camp", code: "XX83" },
        { name: "Ministries", code: "XX84" },
        { name: "Nima", code: "XX85" },
        { name: "New Town", code: "XX86" },
        { name: "North Kaneshie", code: "XX87" },
        { name: "North Legon", code: "XX88" },
        { name: "North Ridge", code: "XX89" },
        { name: "Nungua", code: "XX90" },
        { name: "Nyamekye", code: "XX91" },
        { name: "Odorkor", code: "XX92" },
        { name: "Ofankor", code: "XX93" },
        { name: "Ogbojo", code: "XX94" },
        { name: "Okponglo", code: "XX95" },
        { name: "Osu", code: "XX96" },
        { name: "Oyarifa", code: "XX97" },
        { name: "Oyibi", code: "XX98" },
        { name: "Pantang", code: "XX99" },
        { name: "Pig Farm", code: "XX100" },
        { name: "Prampram", code: "XX101" },
        { name: "Pokuase", code: "XX102" },
        { name: "Race Course", code: "XX103" },
        { name: "Ridge", code: "XX104" },
        { name: "Ring Road", code: "XX105" },
        { name: "Russia", code: "XX106" },
        { name: "Roman Ridge", code: "XX107" },
        { name: "Sakaman", code: "XX108" },
        { name: "Sakumono", code: "XX109" },
        { name: "Santa Maria", code: "XX110" },
        { name: "Sapeiman", code: "XX111" },
        { name: "Shiashie", code: "XX112" },
        { name: "Sowutuom", code: "XX113" },
        { name: "Spintex", code: "XX114" },
        { name: "Sukura", code: "XX115" },
        { name: "Tabora", code: "XX116" },
        { name: "Taifa", code: "XX117" },
        { name: "Tantra Hills", code: "XX118" },
        { name: "Tema Comm 1 - 24", code: "XX119" },
        { name: "Tema Comm 25", code: "XX120" },
        { name: "Tesano", code: "XX121" },
        { name: "Teshie", code: "XX122" },
        { name: "Trade Fair", code: "XX123" },
        { name: "Trassaco", code: "XX124" },
        { name: "Tsaado (Tse Addo)", code: "XX125" },
        { name: "Weija", code: "XX126" },
        { name: "West Hills", code: "XX127" },
        { name: "West Legon", code: "XX128" },
        { name: "Zongo Junction", code: "XX129" }
      ];
    return towns.find(town => town.code == townCode).name;
  };


const getTotalDonuts = items => {
    return items
        .map(item => {
            if (item.sku.match(/\d/g) == null) {
                return 0;
            }
            let noOfDonuts = item.sku.match(/\d/g).join("");
            return noOfDonuts * item.quantity;
        })
        .reduce((a, b) => a + b, 0);
};

// Create Order
exports.createOrder = (req, res) => {   

    const newOrder = new Order({
        orderId: req.body.id,
        parentID: req.body.parent_id,
        number: req.body.number,
        orderKey: req.body.order_key,
        createdVia: req.body.created_via,
        version: req.body.version,
        status: modifyStatus(req.body.status),
        currency: req.body.currency,
        discountTotal: req.body.discount_total,
        discountTax: req.body.discount_tax,
        shippingTotal: req.body.shipping_total,
        shippingTax: req.body.shipping_tax,
        cartTax: req.body.cart_tax,
        total: req.body.total,
        totalTax: req.body.total_tax,
        totalDonuts: getTotalDonuts(req.body.line_items),
        pricesIncludeTax: req.body.prices_include_tax,
        customerId: req.body.customer_id,
        customerIpAdress: req.body.customer_ip_address,
        customerNote:req.body.customer_note,
        billing: req.body.billing,
        shipping: req.body.shipping,
        paymentMethod: req.body.payment_method,
        paymentMethodTitle: req.body.payment_method_title,
        transactionId: req.body.transaction_id,
        cartHash:req.body.cart_hash,
        metaData: req.body.meta_data,
        lineItems: req.body.line_items,
        taxLines: req.body.tax_lines,
        shippingLines: req.body.shipping_lines,
        feeLines: req.body.fee_lines,
        couponLines: req.body.coupon_lines, 
        refunds: req.body.refunds,
        deliveryDate: getDeilveryDate(req.body.meta_data) ,
        zone: getTownName(req.body.shipping.state)
    });

    newOrder.save((err) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.json({ 
                status: false,
                message: `Oops! An error occured. Error: ${err}`
            }); 
        }
        res.statusCode = 201;
        console.log('Document is successfully saved.');
        console.log('Pusher alert being sent');
        /********** PUSHER ***********/
        pusher.trigger('my-channel', 'my-event', {
            "message": "Fetch orders",
            "code":"01"
          });
          /*********************/
          console.log('Pusher alert gone!!');
          

        res.json({ message: 'hooray! Order Saved!' });   
      });

};


// Update Order    
exports.updateOrder = (req, res) =>  {
    console.log(req.body);
    Order.updateMany(
        {orderId: req.body.id}
        ,{$set:{status:'cancelledByWoocomerce'}}
        ,(err) => {   
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.json({ 
                    status: false,
                    message: `Oops! An error occured. Error: ${err}`
                }); 
            }
            
            const newOrder = new Order({
                orderId: req.body.id,
                parentID: req.body.parent_id,
                number: req.body.number,
                orderKey: req.body.order_key,
                createdVia: req.body.created_via,
                version: req.body.version,
                status: modifyStatus(req.body.status),
                currency: req.body.currency,
                discountTotal: req.body.discount_total,
                discountTax: req.body.discount_tax,
                shippingTotal: req.body.shipping_total,
                shippingTax: req.body.shipping_tax,
                cartTax: req.body.cart_tax,
                total: req.body.total,
                totalTax: req.body.total_tax,
                totalDonuts: getTotalDonuts(req.body.line_items),
                pricesIncludeTax: req.body.prices_include_tax,
                customerId: req.body.customer_id,
                customerIpAdress: req.body.customer_ip_address,
                customerNote:req.body.customer_note,
                billing: req.body.billing,
                shipping: req.body.shipping,
                paymentMethod: req.body.payment_method,
                paymentMethodTitle: req.body.payment_method_title,
                transactionId: req.body.transaction_id,
                cartHash:req.body.cart_hash,
                metaData: req.body.meta_data,
                lineItems: req.body.line_items,
                taxLines: req.body.tax_lines,
                shippingLines: req.body.shipping_lines,
                feeLines: req.body.fee_lines,
                couponLines: req.body.coupon_lines, 
                refunds: req.body.refunds,
                deliveryDate: getDeilveryDate(req.body.meta_data) ,
                zone: getTownName(req.body.shipping.state)
            });
              
            newOrder.save((err) => {
                if (err) {
                    console.log(err);
                    res.statusCode = 500;
                    res.json({ 
                        status: false,
                        message: `Oops! An error occured. Error: ${err}`
                    }); 
                }

                res.statusCode = 201;
                console.log('Document is successfully saved.');

                /********** PUSHER ***********/
                    pusher.trigger('my-channel', 'my-event', {
                        "message": "Fetch orders",
                        "code":"01"
                    });
                  /*********************/

                res.json({ message: 'Order Updated!' });   
            });
            
        }
    )
    .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.json({ 
            status: false,
            message: `Oops! An error occured. Error: ${err}`
        }); 
    })    
};