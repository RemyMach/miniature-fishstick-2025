import { Application, Request, Response } from "express"
import { createProductHandler, deleteProductHandler, detailedProductHandler, listProductHandler, updateProductHandler } from "./product"
import { createUser, login } from "./auth"
import { authMiddleware } from "../middleware/auth"

export const initHandlers = (app: Application) => {
    app.get("/health", (_: Request, res: Response) => {
        res.send({ "message": "ping" })
    })

    app.get("/products", authMiddleware, listProductHandler)
    app.get("/products/:id", detailedProductHandler)
    app.post("/products", createProductHandler)
    app.patch("/products/:id", updateProductHandler)
    app.delete("/products/:id", deleteProductHandler)

    app.post("/auth/signup", createUser)
    app.post("/auth/login", login)
}
