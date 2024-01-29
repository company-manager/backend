import { Router } from 'express'
import {
  getRoles,
  getRoleById,
  addRole,
  deleteRoleById,
} from '@controllers/v1/roles-controller'

const router = Router()

router.get('/', getRoles)
router.post('/', addRole)
router.delete('/', deleteRoleById)
router.get('/:id', getRoleById)

export default router
