import Joi from "joi"

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateProduct:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Le nom du produit
 *         price:
 *           type: number
 *           description: Le prix du produit
 *       example:
 *         name: Exemple de produit
 *         price: 19.99
 */
export interface CreateProductRequest {
    name: string,
    price: number
}

export const CreateProductValidation = Joi.object<CreateProductRequest>({
    name: Joi.string()
        .min(3)
        .required(),
    price: Joi.number()
        .required(),
}).options({ abortEarly: false })