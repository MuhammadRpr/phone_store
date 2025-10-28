import { request } from "express";
import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { createProductSchema, updateProductSchema } from "../validations/productValidation.js";
import validate from "../validations/validate.js";


export const getAllProduct = async () => {
    const [products] = await pool.query("SELECT * FROM products");
    return products;
};

export const getProductById = async (id) => {
    const [products] = await pool.query("SELECT * FROM products WHERE id=?", [id]);
    if (products.length === 0) throw new ResponseError(404, "Product not found");
    return products[0];
};



export const createProduct = async (data) => {
    const validated = validate(createProductSchema, data);
    const { user_id, name, description, price, stock } = validated;

    const [result] = await pool.query(
        "INSERT INTO products (user_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
        [user_id, name, description, price, stock]
    );

    return { id: result.insertId, user_id, name, description, price, stock };
};

export const updateProduct = async (id, request) => {
    const productId = Number(id);
    const validated = validate(updateProductSchema, request);
    const { user_id, name, description, price, stock } = validated;

    const [existingProduct] = await pool.query("SELECT * FROM products WHERE id=?", [productId]);
    if (!existingProduct.length) throw new ResponseError(404, "Product not found");

    const [result] = await pool.query(
        `UPDATE products 
     SET user_id=?, name=?, description=?, price=?, stock=? 
     WHERE id=?`,
        [user_id, name, description, price, stock, productId]
    );

    if (result.affectedRows === 0)
        throw new ResponseError(400, "Tidak ada perubahan pada data produk");

    const [updatedProduct] = await pool.query(
        `SELECT id, user_id, name, description, price, stock 
     FROM products 
     WHERE id=?`,
        [productId]
    );

    return updatedProduct[0];
};


export const deleteProduct = async (id) => {
    const [result] = await pool.query("DELETE FROM products WHERE id=?", [id]);
    if (result.affectedRows === 0) throw new ResponseError(404, "Product not found");
    return { message: "Product deleted successfully" };
};
