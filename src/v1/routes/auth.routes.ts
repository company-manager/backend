import express from 'express'
import authController from '@src/v1/controllers/auth.controller'
import dataValidator from '@src/middleware/data-validation'
import companySchema from '@schemas-V1/companies.schemas'
import { registerUserSchema } from '@schemas-V1/users.schemas'
import loginSchema from '@schemas-V1/login.schemas'

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
