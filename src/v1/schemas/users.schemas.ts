import Joi from 'joi'

const firstName = Joi.string().regex(/(^[A-Z][a-z]+$)/)
const lastName = Joi.string().regex(/(^[A-Z][a-z]+$)/)
const email = Joi.string().regex(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)
const userPassword = Joi.string().regex(
    /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
)
const roleId = Joi.number().valid(1, 2, 3)
const termsAccepted = Joi.boolean().valid(true)

const registerSchema = {
    first_name: firstName.required(),
    last_name: lastName.required(),
    email: email.required(),
    user_password: userPassword.required(),
    role_id: roleId,
    terms_accepted: termsAccepted.required(),
}

const createSchema = {
    first_name: firstName.required(),
    last_name: lastName.required(),
    email: email.required(),
    user_password: userPassword.required(),
    role_id: roleId.required(),
}

const updateSchema = {
    first_name: firstName,
    last_name: lastName,
    email,
    user_password: userPassword,
    role_id: roleId,
}

export const registerUserSchema = Joi.object().keys(registerSchema)
export const createUserSchema = Joi.object().keys(createSchema)
export const updateUserSchema = Joi.object().keys(updateSchema)
