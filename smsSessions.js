// smsSessions.js
// Holds in-progress "get a number" selections per user while they click
// through the provider -> service -> country dropdowns.
// Mirrors the client.giveaways Map pattern already used in index.js.

const sessions = new Map();

function getSession(userId){
    return sessions.get(userId) || null;
}

function setSession(userId, data){
    const current = sessions.get(userId) || {};
    sessions.set(userId, { ...current, ...data });
    return sessions.get(userId);
}

function clearSession(userId){
    sessions.delete(userId);
}

module.exports = {
    getSession,
    setSession,
    clearSession
};
