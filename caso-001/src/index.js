require("dotenv").config();

const http = require("node:http");
const { productsRouter } = require("./routes/products");
const { sendError404 } = require("./utils/response");
const { rateLimiter } = require("./utils/rateLimiter");
const { validateContentType } = require("./utils/validateContentType");

const port = process.env.PORT ?? 1234;

const server = http.createServer((req, res) => {
  if (!rateLimiter(req, res)) return;
  if (!validateContentType(req, res)) return;

  if (req.url.startsWith("/product")) {
    req.url = req.url.slice("/product".length) || "/";
    return productsRouter(req, res);
  }

  // Page not found
  sendError404(res);
});

server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
