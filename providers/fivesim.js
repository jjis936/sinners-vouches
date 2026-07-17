// providers/fivesim.js
// Thin wrapper around the 5sim.net API (https://5sim.net/v1)

const BASE = "https://5sim.net/v1";

function headers(){
    return {
        "Authorization": `Bearer ${process.env.FIVESIM_API_KEY}`,
        "Accept": "application/json"
    };
}

async function buyNumber(country, service, operator = "any"){

    const res = await fetch(
        `${BASE}/user/buy/activation/${country}/${operator}/${service}`,
        { headers: headers() }
    );

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "5sim purchase failed");
    }

    return {
        orderId: data.id,
        phone: data.phone
    };

}

async function checkOrder(orderId){

    const res = await fetch(
        `${BASE}/user/check/${orderId}`,
        { headers: headers() }
    );

    const data = await res.json();

    const latestSms =
        Array.isArray(data.sms) && data.sms.length
            ? data.sms[data.sms.length - 1]
            : null;

    return {
        status: data.status,       // PENDING | RECEIVED | CANCELED | TIMEOUT | FINISHED
        code: latestSms ? latestSms.code : null,
        fullText: latestSms ? latestSms.text : null
    };

}

async function finishOrder(orderId){

    const res = await fetch(
        `${BASE}/user/finish/${orderId}`,
        { headers: headers() }
    );

    return res.json();

}

async function cancelOrder(orderId){

    // Only allowed while status is PENDING (no code delivered yet) - refunds balance
    const res = await fetch(
        `${BASE}/user/cancel/${orderId}`,
        { headers: headers() }
    );

    return res.json();

}

module.exports = {
    buyNumber,
    checkOrder,
    finishOrder,
    cancelOrder
};
