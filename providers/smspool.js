// providers/smspool.js
// Thin wrapper around the SMSPool.net API (https://api.smspool.net)

const BASE = "https://api.smspool.net";

async function buyNumber(country, service){

    const params = new URLSearchParams({
        key: process.env.SMSPOOL_API_KEY,
        country,
        service
    });

    const res = await fetch(`${BASE}/purchase/sms`, {
        method: "POST",
        body: params
    });

    const data = await res.json();

    if(data.success !== 1){
        throw new Error(data.message || "SMSPool purchase failed");
    }

    return {
        orderId: data.order_id,
        phone: data.phonenumber
    };

}

async function checkSms(orderId){

    const params = new URLSearchParams({
        key: process.env.SMSPOOL_API_KEY,
        orderid: orderId
    });

    const res = await fetch(`${BASE}/sms/check`, {
        method: "POST",
        body: params
    });

    const data = await res.json();

    return {
        status: data.status, // pending | success | cancelled | expired | refunded
        code: data.sms || null
    };

}

async function resendSms(orderId){

    const params = new URLSearchParams({
        key: process.env.SMSPOOL_API_KEY,
        orderid: orderId
    });

    const res = await fetch(`${BASE}/sms/resend`, {
        method: "POST",
        body: params
    });

    return res.json();

}

async function cancelSms(orderId){

    const params = new URLSearchParams({
        key: process.env.SMSPOOL_API_KEY,
        orderid: orderId
    });

    const res = await fetch(`${BASE}/sms/cancel`, {
        method: "POST",
        body: params
    });

    return res.json();

}

module.exports = {
    buyNumber,
    checkSms,
    resendSms,
    cancelSms
};
