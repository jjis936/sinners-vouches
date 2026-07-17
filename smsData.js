// smsData.js
// Edit these lists to match what you actually want to offer/sell.
// "value" is what gets shown in embeds; providerSlug maps it to each
// provider's own country/service naming since they don't always match.

const SERVICES = [
    { label: "Telegram", value: "telegram" },
    { label: "WhatsApp", value: "whatsapp" },
    { label: "Google", value: "google" },
    { label: "Discord", value: "discord" },
    { label: "Facebook", value: "facebook" }
];

const COUNTRIES = [
    {
        label: "USA",
        value: "usa",
        slugs: { "5sim": "usa", smspool: "usa" }
    },
    {
        label: "UK",
        value: "uk",
        slugs: { "5sim": "england", smspool: "uk" }
    },
    {
        label: "Russia",
        value: "russia",
        slugs: { "5sim": "russia", smspool: "russia" }
    },
    {
        label: "Indonesia",
        value: "indonesia",
        slugs: { "5sim": "indonesia", smspool: "indonesia" }
    },
    {
        label: "Philippines",
        value: "philippines",
        slugs: { "5sim": "philippines", smspool: "philippines" }
    }
];

function countrySlug(countryValue, provider){
    const entry = COUNTRIES.find(c => c.value === countryValue);
    return entry ? entry.slugs[provider] : countryValue;
}

module.exports = {
    SERVICES,
    COUNTRIES,
    countrySlug
};
