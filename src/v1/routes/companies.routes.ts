import { Router } from 'express'
import companyControllers from '@controllers-V1/companies.controllers'

const router = Router()

router.get('/:id', companyControllers.getById)
// .post('/', usersControllers.add)
// .delete('/:id', usersControllers.remove)
// .patch('/:id', usersControllers.update)

export default router
