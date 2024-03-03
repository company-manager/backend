import { Router } from 'express'
import clientsController from '@controllers-V1/clients.controller'

const router = Router()

router.get('/', clientsController.getAllByCompany)
router.get('/:id', clientsController.getById)
router.delete('/:id', clientsController.remove)
router.post('/', clientsController.add)

export default router
