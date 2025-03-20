import { Application, Request, Response } from "express"
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
