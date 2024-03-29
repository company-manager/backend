import { Router } from 'express'
import companyControllers from '@controllers-V1/companies.controllers'
import { authenticateToken } from '@src/middleware/authorization'

const router = Router()

router.get('/:id', authenticateToken, companyControllers.getById)
router.delete('/:id', authenticateToken, companyControllers.remove)

export default router
