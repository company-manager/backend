import express from 'express'
import authController from '@src/v1/controllers/auth.controller'
import dataValidator from '@src/middleware/data-validation'
import companySchema from '@v1/schemas/companies.schemas'
import { registerUserSchema } from '@v1/schemas/users.schemas'
import loginSchema from '@v1/schemas/login.schemas'

const router = express.Router()

const companyValidator = dataValidator(companySchema, 'company')
const userValidator = dataValidator(registerUserSchema, 'user')
const loginValidator = dataValidator(loginSchema, 'user')

router.post('/login', loginValidator, authController.login)
router.get('/refresh', authController.refresh)
router.delete('/logout', authController.logout)
router.post(
    '/register',
    companyValidator,
    userValidator,
    authController.register,
)
router.get('/verify', authController.verify)

export default router
