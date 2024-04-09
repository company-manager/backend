import { Router } from 'express'
import companyControllers from '@v1/controllers/companies.controllers'
import { authenticateToken } from '@src/middleware/authorization'

const router = Router()

router.get('/:id', authenticateToken, companyControllers.getById)
router.delete('/:id', authenticateToken, companyControllers.remove)

export default router
