import * as ProductService from "../services/productService.js";

export const getAllProductsHandler = async (req, res, next) => {
    try {
        const data = await ProductService.getAllProduct();
        res.status(200).json({ status: "success", data });
    } catch (err) { next(err); }
};

export const getProductByIdHandler = async (req, res, next) => {
    try {
        const data = await ProductService.getProductById(req.params.id);
        res.status(200).json({ status: "success", data });
    } catch (err) { next(err); }
};

export const addProductHandler = async (req, res, next) => {
    try {
        const data = await ProductService.createProduct(req.body);
        res.status(201).json({ status: "success", message: "Product created", data });
    } catch (err) { next(err); }
};

export const updateProductHandler = async (req, res, next) => {
    try {
        const data = await ProductService.updateProduct(req.params.id, req.body);
        res.status(200).json({ status: "success", message: "Product updated", data });
    } catch (err) { next(err); }
};

export const deleteProductHandler = async (req, res, next) => {
    try {
        const data = await ProductService.deleteProduct(req.params.id);
        res.status(200).json({ status: "success", message: "Product deleted", data });
    } catch (err) { next(err); }
};
