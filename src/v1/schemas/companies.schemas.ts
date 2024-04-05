import Joi from 'joi'

const companyName = Joi.string()
    .regex(/(^[A-Za-z]+)[A-Za-z .,-]+/)
    .required()
const taxpayerId = Joi.string()
    .regex(/^[0-9]{9}$/)
    .length(9)
    .required()

const schema = {
    company_name: companyName,
    taxpayer_id: taxpayerId,
}

const companySchema = Joi.object().keys(schema)

export default companySchema
