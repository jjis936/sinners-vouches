const fs = require("fs");
const path = require("path");

const databaseFile = path.join(__dirname, "orders.json");


// Create database file if it does not exist
if (!fs.existsSync(databaseFile)) {

    fs.writeFileSync(
        databaseFile,
        JSON.stringify({
            orders: [],
            counter: 1
        }, null, 4)
    );

}



// Read database

function getDatabase(){

    return JSON.parse(
        fs.readFileSync(databaseFile, "utf8")
    );

}



// Save database

function saveDatabase(data){

    fs.writeFileSync(
        databaseFile,
        JSON.stringify(data, null, 4)
    );

}




// Create new order

function createOrder(order){


    const db = getDatabase();



    const orderNumber =

    "SS-" +

    String(db.counter).padStart(4,"0");



    const newOrder = {


        id: orderNumber,


        customer:
        order.customer,


        service:
        order.service,


        package:
        order.package,


        price:
        order.price,


        notes:
        order.notes || "None",


        status:
        "Pending",


        created:
        new Date().toISOString()


    };



    db.orders.push(newOrder);



    db.counter++;



    saveDatabase(db);



    return newOrder;



}





// Get all orders

function getOrders(){

    const db = getDatabase();

    return db.orders;

}





// Update order status

function updateOrderStatus(id,status){



    const db = getDatabase();



    const order = db.orders.find(

        order => order.id === id

    );



    if(!order){

        return false;

    }



    order.status = status;



    saveDatabase(db);



    return order;



}






// Find order

function getOrder(id){



    const db = getDatabase();



    return db.orders.find(

        order => order.id === id

    );



}





module.exports = {


    createOrder,

    getOrders,

    updateOrderStatus,

    getOrder


};
