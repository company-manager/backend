import express from 'express'
import {
  loginController,
  logoutController,
  refreshTokenController,
} from '../../controllers/v1/auth-controller'

const router = express.Router()

router.post('/login', loginController)
router.get('/refresh-token', refreshTokenController)
router.delete('/logout', logoutController)

export default router
