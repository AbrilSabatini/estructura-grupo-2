/**
 * The function `sendJson` sets the status code and content type headers before sending JSON data in a
 * response.
 * @param res - Response object in Node.js. It is used to send a response back to the client making the request.
 * @param statusCode - HTTP status code that will be set in the response.
 * @param data - JSON data that you want to send as the response.
 */
const sendJson = (res, statusCode, data) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
};

/**
 * The function `sendError404` sends a JSON response with a 404 status code and an error message,
 * defaulting to "Page Not Found" if no message is provided.
 * @param res - Response object in Node.js. It is used to send a response back to the client making the request.
 * @param message - String that represents an optional error message to be
 * included in the response. If no message is provided, the default message "Page Not Found" will be
 * used.
 * @returns The `sendError404` function is returning the result of calling the `sendJson` function with
 * the `res` (response), status code `404`, and an object containing an `error` key with the message
 * provided or a default message "Page Not Found" if no message is provided.
 */
const sendError404 = (res, message) => {
  const msg = message ? message : "Page Not Found";
  return sendJson(res, 404, { error: msg });
};

module.exports = { sendJson, sendError404 };
