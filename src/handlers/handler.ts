import { Application, Request, Response } from "express"
import { ProductIdValidation as ProductIdValidation } from "./validators/product-id"
import { AppDataSource } from "../db/database"
import { Product } from "../db/models/product"
import { CreateProductValidation } from "./validators/create-product"
import { generateValidationErrorMessage } from "./validators/generate-validation-message"
import { ProductUpdateValidation } from "./validators/update-product"
import { ListProductsValidation } from "./validators/list-products"
import { createProductHandler, deleteProductHandler, detailedProductHandler, listProductHandler, updateProductHandler } from "./product"

export const initHandlers = (app: Application) => {
    app.get("/health", (_: Request, res: Response) => {
        res.send({ "message": "ping" })
    })

    app.get("/products", listProductHandler)
    app.get("/products/:id", detailedProductHandler)
    app.post("/products", createProductHandler)
    app.patch("/products/:id", updateProductHandler)
    app.delete("/products/:id", deleteProductHandler)
}
