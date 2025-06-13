/**
 * The `getBody` function parses the request body as JSON and assigns a default value to the `id`
 * property if it is not provided.
 */
const getBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
};

module.exports = { getBody };
