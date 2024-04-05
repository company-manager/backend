import { Router } from 'express'
import documentsController from '@controllers-V1/documents.controller'
import dataValidator from '@src/middleware/data-validation'
import {
    createDocumentSchema,
    updateDocumentSchema,
} from '@schemas-V1/documents.schemas'

const router = Router()

const createValidator = dataValidator(createDocumentSchema, 'document')
const updateValidator = dataValidator(updateDocumentSchema, 'document')

router.get('/', documentsController.getAll)
router.get('/:id', documentsController.getById)
router.post('/', createValidator, documentsController.create)
router.put('/:id', updateValidator, documentsController.update)
router.delete('/:id', documentsController.remove)

export default router
