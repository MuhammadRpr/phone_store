import express from "express"
import { addProductHandler, deleteProductHandler, getAllProductsHandler, getProductByIdHandler, updateProductHandler } from "../handlers/productHandler.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProductsHandler)
productRouter.get("/products/:id", getProductByIdHandler)
productRouter.post("/products", addProductHandler)
productRouter.put("/products/:id", updateProductHandler)
productRouter.delete("/products/:id", deleteProductHandler)

export default productRouter;