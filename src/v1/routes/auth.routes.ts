import express from 'express'
import authController from '@src/v1/controllers/auth.controller'

const router = express.Router()

router.post('/login', authController.login)
router.get('/refresh', authController.refresh)
router.delete('/logout', authController.logout)
router.post('/register', authController.register)
router.get('/verify/:id/:token', authController.verify)

export default router
