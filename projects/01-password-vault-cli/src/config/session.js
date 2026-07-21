let sessionKey = null;

function setSessionKey(key) {
  sessionKey = key;
}

function getSessionKey() {
  return sessionKey;
}

function clearSession() {
  sessionKey = null;
}

module.exports = {
  setSessionKey,
  getSessionKey,
  clearSession,
};
