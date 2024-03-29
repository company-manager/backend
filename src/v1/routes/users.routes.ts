import { Router } from 'express'
import usersControllers from '@src/v1/controllers/users.controller'
import { adminProtected } from '@src/middleware/authorization'

const router = Router()

router.get('/', usersControllers.getAll)
router.get('/:id', usersControllers.getById)
router.post('/', adminProtected, usersControllers.create)
router.put('/:id', usersControllers.update)
router.delete('/:id', usersControllers.remove)

export default router
