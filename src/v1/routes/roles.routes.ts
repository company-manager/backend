import { Router } from 'express'
import rolesControllers from '@src/v1/controllers/roles.controller'

const router = Router()

router.get('/', rolesControllers.getAll)
router.post('/', rolesControllers.add)
router.delete('/:id', rolesControllers.remove)
router.get('/:id', rolesControllers.getById)

export default router
