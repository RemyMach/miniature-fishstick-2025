import { Request, Response } from "express";
import { CreateProductValidation } from "./validators/create-product";
import { generateValidationErrorMessage } from "./validators/generate-validation-message";
import { AppDataSource } from "../db/database";
import { Product } from "../db/models/product";
import { ListProductsValidation } from "./validators/list-products";
import { ProductIdValidation } from "./validators/product-id";
import { ProductUpdateValidation } from "./validators/update-product";

/**
    * @openapi
    * '/products':
    *  post:
    *     tags:
    *     - Products
    *     summary: Create a new product
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/CreateProduct'
    *     responses:
    *       200:
    *         description: Product created
    *         content:
    *          application/json:
    *           example:
    *             "id": "10"
    *             "name": "Courgette"
    *             "description": "product description"
    *             "price": 879
    *             "createdAt": "2023-04-03T00:25:32.189Z"
    */
export const createProductHandler = async (req: Request, res: Response) => {
    try {
        const validation = CreateProductValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details))
            return
        }

        const createProductRequest = validation.value
        const productRepository = AppDataSource.getRepository(Product)
        const product = productRepository.create({ ...createProductRequest })
        const productCreated = await productRepository.save(product);

        res.status(201).send(productCreated)
    } catch (error) {

        if (error instanceof Error) {
            console.log(`Internal error: ${error.message}`)
        }
        res.status(500).send({ "message": "internal error" })
    }
}

export const listProductHandler = async (req: Request, res: Response) => {
    try {
        console.log((req as any).user)
        const validation = ListProductsValidation.validate(req.query);
        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details))
            return
        }

        const listProductRequest = validation.value
        console.log(listProductRequest)

        const query = AppDataSource.createQueryBuilder(Product, 'product')

        if (listProductRequest.priceMax !== undefined) {
            query.andWhere("product.price <= :priceMax", { priceMax: listProductRequest.priceMax })
        }

        query.skip((listProductRequest.page - 1) * listProductRequest.limit);
        query.take(listProductRequest.limit);

        const [products, totalCount] = await query.getManyAndCount();

        const page = listProductRequest.page
        const totalPages = Math.ceil(totalCount / listProductRequest.limit);

        res.send(
            {
                data: products,
                page_size: listProductRequest.limit,
                page,
                total_count: totalCount,
                total_pages: totalPages,
            }
        )

    } catch (error) {
        if (error instanceof Error) {
            console.log(`Internal error: ${error.message}`)
        }
        res.status(500).send({ "message": "internal error" })
    }
}

export const detailedProductHandler = async (req: Request, res: Response) => {
    try {
        const validation = ProductIdValidation.validate(req.params);
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
}

export const updateProductHandler = async (req: Request, res: Response) => {
    try {
        const validation = ProductUpdateValidation.validate({ ...req.params, ...req.body })
        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details))
            return
        }

        const updateProduct = validation.value
        const productRepository = AppDataSource.getRepository(Product)
        const productFound = await productRepository.findOneBy({ id: updateProduct.id })
        if (productFound === null) {
            res.status(404).send({ "error": `product ${updateProduct.id} not found` })
            return
        }

        if (updateProduct.price) {
            productFound.price = updateProduct.price
        }

        const productUpdate = await productRepository.save(productFound)
        res.status(200).send(productUpdate)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "Internal error" })
    }
}

export const deleteProductHandler = async (req: Request, res: Response) => {
    try {
        const validation = ProductIdValidation.validate({ ...req.params, ...req.body })
        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details))
            return
        }

        const updateProduct = validation.value
        const productRepository = AppDataSource.getRepository(Product)
        const productFound = await productRepository.findOneBy({ id: updateProduct.id })
        if (productFound === null) {
            res.status(404).send({ "error": `product ${updateProduct.id} not found` })
            return
        }

        const productDeleted = await productRepository.remove(productFound)
        res.status(200).send(productDeleted)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "Internal error" })
    }
}
