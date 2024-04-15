import responses from '@src/helpers/responses'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

type Schema = Joi.ObjectSchema<unknown>

const dataValidator = (schema: Schema, key?: string | undefined) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { value, error } = schema.validate(
            key ? req.body.payload[key] : req.body.payload,
        )

        if (error) {
            const errorMessage = error.details[0].message
            console.log(error)
            return res
                .status(400)
                .json({ ...responses.badRequest, error: errorMessage })
        }

        if (value) {
            next()
        }
    }
}

export default dataValidator
