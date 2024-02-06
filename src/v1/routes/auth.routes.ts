import express from 'express'
import authController from '@src/v1/controllers/auth.controller'

const router = express.Router()

router.post('/login', authController.login)
router.get('/refresh-token', authController.refresh)
router.delete('/logout', authController.logout)

export default router
