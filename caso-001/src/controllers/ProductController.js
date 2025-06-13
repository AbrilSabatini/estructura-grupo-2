const ProductService = require("../services/ProductService");
const { sendJson, sendError404 } = require("../utils/response");
const { getBody } = require("../utils/getBody");
const { validateProduct } = require("../validators/validateProduct");
const { authMiddleware } = require("../utils/authMiddleware");

const productService = new ProductService();

class ProductController {
  async getAllProducts(res) {
    try {
      const products = await productService.getAllProducts();
      return sendJson(res, 200, products);
    } catch (error) {
      const status = error.statusCode || 500;
      return sendJson(res, status, { error: error.message });
    }
  }

  async findProductById(res, id) {
    try {
      const product = await productService.findProductById(id);
      if (!product) return sendError404(res, `Product with id ${id} not found`);

      return sendJson(res, 200, product);
    } catch (error) {
      const status = error.statusCode || 500;
      return sendJson(res, status, { error: error.message });
    }
  }

  async createProduct(req, res) {
    if (!authMiddleware(req, res)) return;

    try {
      const body = await getBody(req);

      const errors = validateProduct(body);

      if (errors.length > 0) {
        return sendJson(res, 400, { errors });
      }

      const newProduct = await productService.createProduct(body);

      return sendJson(res, 201, newProduct);
    } catch (error) {
      const status = error.statusCode || 500;
      return sendJson(res, status, { error: error.message });
    }
  }

  async updateProduct(req, res, id) {
    if (!authMiddleware(req, res)) return;

    const product = await productService.findProductById(id);
    if (!product) return sendError404(res, `Product with id ${id} not found`);

    try {
      const body = await getBody(req);
      const isPartial = req.method === "PATCH";

      const errors = validateProduct(body, isPartial);

      if (errors.length > 0) {
        return sendJson(res, 400, { errors });
      }

      let updatedProduct = isPartial
        ? await productService.updatePartialProduct(id, body)
        : await productService.updateProduct(id, body);

      return sendJson(res, 200, updatedProduct);
    } catch (error) {
      const status = error.statusCode || 500;
      return sendJson(res, status, { error: error.message });
    }
  }

  async deleteProduct(req, res, id) {
    if (!authMiddleware(req, res)) return;

    try {
      const product = await productService.findProductById(id);

      if (!product) return sendError404(res, `Product with id ${id} not found`);

      await productService.deleteProduct(id);

      // return sendJson(res, 200, { response: `Product with id ${id} deleted` });
      return res.writeHead(204).end();
    } catch (error) {
      const status = error.statusCode || 500;
      return sendJson(res, status, { error: error.message });
    }
  }
}

module.exports = ProductController;
