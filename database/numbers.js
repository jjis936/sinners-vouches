const fs = require("fs");
const path = require("path");

const databaseFile = path.join(__dirname, "numbers.json");


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


function getDatabase(){
    return JSON.parse(
        fs.readFileSync(databaseFile, "utf8")
    );
}


function saveDatabase(data){
    fs.writeFileSync(
        databaseFile,
        JSON.stringify(data, null, 4)
    );
}


// Log a newly purchased number
function createNumberOrder(order){

    const db = getDatabase();

    const orderId = "SN-" + String(db.counter).padStart(4, "0");

    const newOrder = {
        id: orderId,
        buyer: order.buyer,           // discord user id
        provider: order.provider,     // "5sim" | "smspool"
        service: order.service,
        country: order.country,
        phone: order.phone,
        providerOrderId: order.providerOrderId,
        status: "pending",            // pending | received | canceled | expired
        code: null,
        created: new Date().toISOString()
    };

    db.orders.push(newOrder);
    db.counter++;

    saveDatabase(db);

    return newOrder;

}


function updateNumberOrder(id, patch){

    const db = getDatabase();
    const order = db.orders.find(o => o.id === id);

    if(!order) return false;

    Object.assign(order, patch);
    saveDatabase(db);

    return order;

}


function getRecentOrders(limit = 10){
    const db = getDatabase();
    return db.orders.slice(-limit).reverse();
}


function findByProviderOrderId(providerOrderId){
    const db = getDatabase();
    return db.orders.find(o => o.providerOrderId === String(providerOrderId));
}


module.exports = {
    createNumberOrder,
    updateNumberOrder,
    getRecentOrders,
    findByProviderOrderId
};
