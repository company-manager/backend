import Joi from 'joi'

const title = Joi.string().regex(/(^[A-Z][a-z]+$)/)
const body = Joi.string()
const authorId = Joi.string().uuid({ version: 'uuidv4' })
const companyId = Joi.string().uuid({ version: 'uuidv4' })

const createSchema = {
    title: title.required(),
    body,
    author_id: authorId.required(),
    company_id: companyId,
}

const updateSchema = {
    title,
    body,
    author_id: authorId,
}

export const createDocumentSchema = Joi.object().keys(createSchema)
export const updateDocumentSchema = Joi.object().keys(updateSchema)
