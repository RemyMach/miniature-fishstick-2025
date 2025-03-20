import Joi from "joi"

export interface ValidationError {
    [key: string]: string
}

export const generateValidationErrorMessage = (
    errorDetails: Joi.ValidationErrorItem[]
): ValidationError => {
    const formattedErrors: ValidationError = {}
    errorDetails.forEach((detail) => {
        const key = detail.path.join(".")

        formattedErrors[key] = detail.message
    })
    return formattedErrors
}