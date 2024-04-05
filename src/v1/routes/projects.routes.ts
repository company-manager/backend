import { Router } from 'express'
import projectsController from '@v1/controllers/projects.controller'
import dataValidator from '@src/middleware/data-validation'
import {
    createProjectSchema,
    updateProjectSchema,
} from '@v1/schemas/projects.schemas'

const router = Router()

const createValidator = dataValidator(createProjectSchema, 'project')
const updateValidator = dataValidator(updateProjectSchema, 'project')

router.get('/', projectsController.getAll)
router.get('/:id', projectsController.getById)
router.post('/', createValidator, projectsController.create)
router.put('/:id', updateValidator, projectsController.update)
router.delete('/:id', projectsController.remove)

export default router
