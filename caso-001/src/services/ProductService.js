const { pool } = require("../database/connection");
const DatabaseError = require("../errors/DatabaseError");

class ProductService {
  constructor() { }

  async getAllProducts() {
    try {
      const [results] = await pool.query("SELECT * FROM product");
      return results;
    } catch (error) {
      throw new DatabaseError(
        error,
        "Failed to fetch products from the database."
      );
    }
  }

  async findProductById(id) {
    try {
      const [result] = await pool.query("SELECT * FROM product WHERE id = ?", [
        id,
      ]);
      return result[0];
    } catch (error) {
      throw new DatabaseError(
        error,
        "Failed to fetch product with id from the database."
      );
    }
  }

  async createProduct(body) {
    const { name, description } = body;
    try {
      const [result] = await pool.query(
        "INSERT INTO product (name, description) VALUES (?, ?)",
        [name, description]
      );
      return {
        id: result.insertId,
        name,
        description,
      };
    } catch (error) {
      throw new DatabaseError(error, "Failed to create product.");
    }
  }

  async updatePartialProduct(id, body) {
    const fields = [];
    const values = [];

    if (body.name !== undefined) {
      fields.push("name = ?");
      values.push(body.name);
    }

    if (body.description !== undefined) {
      fields.push("description = ?");
      values.push(body.description);
    }

    if (fields.length === 0) {
      return await this.findProductById(id);
    }

    try {
      const query = `UPDATE product SET ${fields.join(", ")} WHERE id = ?`;
      values.push(id);

      await pool.query(query, values);

      const updatedProduct = await this.findProductById(id);
      return updatedProduct;
    } catch (error) {
      throw new DatabaseError(error, "Failed to update product.");
    }
  }

  async updateProduct(id, body) {
    const { name, description } = body;
    try {
      await pool.query(
        "UPDATE product SET name = ?, description = ? WHERE id = ?",
        [name, description, id]
      );
      return {
        id,
        name,
        description,
      };
    } catch (error) {
      throw new DatabaseError(error, "Failed to update product.");
    }
  }

  async deleteProduct(id) {
    try {
      await pool.query("DELETE FROM product WHERE id = ?", [id]);
      return [];
    } catch (error) {
      throw new DatabaseError(error, "Failed to delete product.");
    }
  }
}

module.exports = ProductService;
