const { sendJson } = require("./response");

const validateContentType = (req, res) => {
  const contentType = req.headers["content-type"];

  if (contentType && !contentType.includes("application/json")) {
    sendJson(res, 415, {
      error: "Unsupported Media Type: application/json required",
    });
    return false;
  }

  return true;
};

module.exports = { validateContentType };
