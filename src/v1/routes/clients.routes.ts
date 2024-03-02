import { Router } from 'express'
import clientsController from '@controllers-V1/clients.controller'

const router = Router()

router.get('/', clientsController.getAll)
router.get('/:id', clientsController.getById)

export default router
