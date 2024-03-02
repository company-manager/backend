import { Router } from 'express'
import companyControllers from '@controllers-V1/companies.controllers'

const router = Router()

router.post('/', companyControllers.add)
router.get('/:id', companyControllers.getById)
router.delete('/:id', companyControllers.remove)

export default router
