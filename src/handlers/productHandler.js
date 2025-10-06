// dapat data user

import { pool } from "../config/db.js";

export const getAllProductsHandler = async (req, res) => {

    try {
        const [products] = await pool.query("SELECT id, user_id, name, description, price, stock, created_at, updated_at FROM products");

        res.status(200).json({
            status: "success",
            data: products,
        });
    } catch (error) {
        console.error(error)
        throw error;
    }
};

export const getProductByIdHandler = async (req, res) => {

    const { id } = req.params;
    try {
        const [products] = await pool.query("SELECT user_id, name, description, price, stock, created_at, updated_at FROM products WHERE id=?", [id]);

        if (products.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "User not Found"

            })
        }

        res.status(200).json({
            status: "success",
            data: products[0],
        });

    } catch (error) {
        console.error(error);
        throw error;
    }

};

export const addProductHandler = async (req, res) => {
    const { user_id, name, description, price, stock } = req.body;

    if (!user_id || !name || !description || price == null || stock == null) {
        return res.status(400).json({ status: "fail", message: "All fields are required" });
    }

    if (name.includes(" ")) {
        return res.status(400).json({ status: "fail", message: "Name cannot contain spaces" });
    }

    try {
        const [user] = await pool.query("SELECT id FROM users WHERE id = ?", [user_id]);
        if (user.length === 0)
            return res.status(400).json({ status: "fail", message: "Invalid user_id" });

        const [result] = await pool.query(
            "INSERT INTO products (user_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
            [user_id, name, description, price, stock]
        );

        res.status(201).json({
            status: "success",
            message: "Product created successfully",
            data: { id: result.insertId, user_id, name, description, price, stock },
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};


export const updateProductHandler = async (req, res) => {
    const { id } = req.params;
    const { user_id, name, description, price, stock } = req.body;

    try {
        await pool.query(
            "UPDATE products SET user_id=?, name=?, description=?, price=?, stock=? WHERE id=?",
            [user_id, name, description, price, stock, id]
        );

        const [productUpdate] = await pool.query(
            "SELECT id, user_id, name, description, price, stock FROM products WHERE id=?",
            [id]
        );

        if (productUpdate.length === 0) {
            return res.status(404).json({ status: "fail", message: "Product not found" });
        }

        res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            data: productUpdate[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message });
    }
};



export const deleteProductHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const [deleteProduct] = await pool.query('DELETE FROM users WHERE id=?', [id]);

        if (deleteProduct.affectedRows === 0) {
            res.status(404).json({
                status: "fail",
                message: "note not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "user deleted succeessfully"
        })



    } catch (error) {
        console.error(error)
    }
};