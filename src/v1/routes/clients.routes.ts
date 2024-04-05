import { Router } from 'express'
import clientsController from '@controllers-V1/clients.controller'
import dataValidator from '@src/middleware/data-validation'
import {
    createClientSchema,
    updateClientSchema,
} from '@schemas-V1/clients.schemas'

const router = Router()

const createValidator = dataValidator(createClientSchema, 'payload')
const updateValidator = dataValidator(updateClientSchema, 'payload')

router.get('/', clientsController.getAll)
router.get('/:id', clientsController.getById)
router.post('/', createValidator, clientsController.create)
router.put('/:id', updateValidator, clientsController.update)
router.delete('/:id', clientsController.remove)

export default router
