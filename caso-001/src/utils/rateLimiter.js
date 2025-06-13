const { sendJson } = require("./response");

let requestCount = 0;
const max_requests = process.env.MAX_REQUESTS;

const rateLimiter = (req, res) => {
  requestCount++;

  if (requestCount > max_requests) {
    sendJson(res, 429, { error: "Too many requests" });
    return false;
  }

  return true;
};

setInterval(() => {
  requestCount = 0;
}, 20 * 1000);

module.exports = { rateLimiter };
