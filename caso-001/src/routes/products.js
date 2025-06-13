const { getIdFromUrl } = require("../utils/getIdFromUrl");
const { sendError404, sendJson } = require("../utils/response");

const ProductController = require("../controllers/ProductController");

const productController = new ProductController();

const productsRouter = async (req, res) => {
  const { method, url } = req;

  // GET
  if (method === "GET") {
    // Get all
    if (url === "/") {
      return productController.getAllProducts(res);
    }

    // Get by id
    const id = getIdFromUrl(url);
    if (id !== null) {
      return productController.findProductById(res, id);
    }

    // Page not found
    return sendError404(res);
  }

  if (method === "POST") {
    // Create
    if (url === "/") {
      return productController.createProduct(req, res);
    }

    // Page not found
    return sendError404(res);
  }

  if (method === "PUT" || method === "PATCH") {
    // Update
    const id = getIdFromUrl(url);
    if (id !== null) {
      return productController.updateProduct(req, res, id);
    }

    // Page not found
    return sendError404(res);
  }

  if (method === "DELETE") {
    // Delete
    const id = getIdFromUrl(url);
    if (id !== null) {
      return productController.deleteProduct(req, res, id);
    }

    // Page not found
    return sendError404(res);
  }

  if (method === "HEAD")
    return sendJson(res, 405, {
      message: "Method not allowed"
    });

  // Page not found
  return sendJson(res, 501, {
    message: "Method not implemented",
  });
};

module.exports = { productsRouter };
