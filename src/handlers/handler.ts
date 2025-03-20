import { Application, Request, Response } from "express"
import { GetProductValidation } from "./validators/get-product"
import { AppDataSource } from "../db/database"
import { Product } from "../db/models/product"
import { CreateProductValidation } from "./validators/create-product"
import { generateValidationErrorMessage } from "./validators/generate-validation-message"

export const initHandlers = (app: Application) => {
    app.get("/ping", (req: Request, res: Response) => {
        res.send({ "message": "hello world" })
    })

    app.get("/products/:id", async (req: Request, res: Response) => {
        try {
            const validation = GetProductValidation.validate(req.params);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details))
                return
            }

            const getProductRequest = validation.value
            const productRepository = AppDataSource.getRepository(Product)
            const product = await productRepository.findOne({
                where: { id: getProductRequest.id }
            })
            if (product === null) {
                res.status(404).send({ "message": "resource not found" })
                return
            }

            res.status(200).send(product);
        } catch (error) {
            if (error instanceof Error) {
                console.log(`Internal error: ${error.message}`)
            }
            res.status(500).send({ "message": "internal error" })
        }
    })

    app.post("/products", async (req: Request, res: Response) => {
        try {
            const validation = CreateProductValidation.validate(req.body);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details))
                return
            }

            const createProductRequest = validation.value
            const productRepository = AppDataSource.getRepository(Product)
            const product = productRepository.create({ ...createProductRequest})
            const productCreated = await productRepository.save(product);

            res.status(201).send(productCreated)
        } catch (error) {

            if (error instanceof Error) {
                console.log(`Internal error: ${error.message}`)
            }
            res.status(500).send({ "message": "internal error" })
        }
    })
}