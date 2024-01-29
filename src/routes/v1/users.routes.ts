import { Router } from 'express'
import {
  getUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUser,
} from '@src/controllers/v1/users.controller'

const router = Router()

router.get('/', getUsers)
router.post('/', addUser)
router.delete('/', deleteUser)
router.patch('/:id', updateUser)
router.get('/:id', getUserById)

export default router
