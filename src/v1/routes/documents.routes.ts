import { Router } from 'express'
import documentsController from '@v1/controllers/documents.controller'
import dataValidator from '@src/middleware/data-validation'
import {
    createDocumentSchema,
    updateDocumentSchema,
} from '@v1/schemas/documents.schemas'

const router = Router()

const createValidator = dataValidator(createDocumentSchema, 'document')
const updateValidator = dataValidator(updateDocumentSchema, 'document')

router.get('/', documentsController.getAll)
router.get('/:id', documentsController.getById)
router.post('/', createValidator, documentsController.create)
router.put('/:id', updateValidator, documentsController.update)
router.delete('/:id', documentsController.remove)

export default router
