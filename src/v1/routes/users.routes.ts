import { Router } from 'express'
import usersControllers from '@src/v1/controllers/users.controller'

const router = Router()

router
    .get('/', usersControllers.getAll)
    .post('/', usersControllers.create)
    .delete('/:id', usersControllers.remove)
    .patch('/:id', usersControllers.update)
    .get('/:id', usersControllers.getById)

export default router
