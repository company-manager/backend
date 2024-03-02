import { Router } from 'express'
import companyControllers from '@controllers-V1/companies.controllers'
import { authenticateToken } from '@src/middleware/authorization'

const router = Router()

router.post('/', companyControllers.add)
router.get('/:id', companyControllers.getById)

// TODO: check if user who's trying to delete company has admin role
router.delete('/:id', authenticateToken, companyControllers.remove)

export default router
