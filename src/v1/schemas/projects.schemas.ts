import Joi from 'joi'

const name = Joi.string().regex(/(^[A-Z][a-z]+$)/)
const status = Joi.number().valid(1, 2, 3, 4, 5)
const userId = Joi.string().uuid({ version: 'uuidv4' })
const clientId = Joi.string().uuid({ version: 'uuidv4' })
const companyId = Joi.string().uuid({ version: 'uuidv4' })

const createSchema = {
    project_name: name.required(),
    status_id: status,
    user_id: userId.required(),
    client_id: clientId.required(),
    company_id: companyId,
}

const updateSchema = {
    project_name: name,
    status_id: status,
    user_id: userId,
    client_id: clientId,
    company_id: companyId,
}

export const createProjectSchema = Joi.object().keys(createSchema)
export const updateProjectSchema = Joi.object().keys(updateSchema)
