import Joi from 'joi'

const name = Joi.string().regex(/(^[A-Z][a-z]+$)/)
const taxpayerId = Joi.string()
    .regex(/^[0-9]{9}$/)
    .length(9)

const createSchema = {
    name: name.required(),
    taxpayer_id: taxpayerId.required(),
}

const updateSchema = {
    name,
    taxpayer_id: taxpayerId,
}

export const createClientSchema = Joi.object().keys(createSchema)
export const updateClientSchema = Joi.object().keys(updateSchema)
