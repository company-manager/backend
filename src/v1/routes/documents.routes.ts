import { Router } from 'express'
import documentsController from '@v1/controllers/documents.controller'

const router = Router()

router.get('/', documentsController.getAll)
router.get('/:id', documentsController.getById)
router.post('/', documentsController.create)
router.put('/:id', documentsController.update)
router.delete('/:id', documentsController.remove)

export default router
