import { Router } from 'express'
import userControllers from '@src/v1/controllers/users.controller'

const router = Router()

router
    .get('/', userControllers.getAll)
    .post('/', userControllers.add)
    .delete('/:id', userControllers.deleteUser)
    .patch('/:id', userControllers.update)
    .get('/:id', userControllers.getById)

export default router
