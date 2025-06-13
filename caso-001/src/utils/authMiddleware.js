const { sendJson } = require("./response");

const authMiddleware = (req, res) => {
  const token = (req.headers.authorization);

  if (!token) {
    sendJson(res, 401, { error: "Unauthorized." });
    return false;
  }

  const expectedToken = process.env.AUTH_TOKEN || "secret-token";

  if (token !== `Bearer ${expectedToken}`) {
    sendJson(res, 403, { error: "Forbidden. Invalid token." });
    return false;
  }

  return true;
};

module.exports = { authMiddleware };
