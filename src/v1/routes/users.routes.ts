import { Router } from 'express'
import usersControllers from '@src/v1/controllers/users.controller'
import { adminProtected } from '@src/middleware/authorization'
import dataValidator from '@src/middleware/data-validation'
import { createUserSchema, updateUserSchema } from '@schemas-V1/users.schemas'

const router = Router()

const createValidator = dataValidator(createUserSchema, 'payload')
const updateValidator = dataValidator(updateUserSchema, 'payload')

router.get('/', usersControllers.getAll)
router.get('/:id', usersControllers.getById)
router.post('/', adminProtected, createValidator, usersControllers.create)
router.put('/:id', updateValidator, usersControllers.update)
router.delete('/:id', usersControllers.remove)

export default router
