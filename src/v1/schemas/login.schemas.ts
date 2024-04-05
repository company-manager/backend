import Joi from 'joi'

const email = Joi.string()
    .regex(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)
    .required()
const password = Joi.string().required()

const schema = { email, password }

const loginSchema = Joi.object().keys(schema)

export default loginSchema
