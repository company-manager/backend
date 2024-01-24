/* eslint-disable camelcase */
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { checkUserEmailQuery } from '@queries/auth-queries'
import pool from '@database/.'
import { jwtTokens } from '@utils/jwt-helpers'

dotenv.config()

const loginController = async (req, res) => {
  try {
    const validUser = req.body.user
    if (!validUser) return res.status(400).json({ code: 400, status: 'Bad Request', message: '🔴 Bad request: no user email or password given.' })

    const { email, password } = req.body.user
    const users = await pool.query(checkUserEmailQuery, [email])

    const user = users.rows[0]
    if (!user) return res.status(401).json({ code: 401, status: 'Unauthorized', message: '🔴 Email not found.' })

    const validPassword = await bcrypt.compare(password, user.user_password)
    if (!validPassword) return res.status(401).json({ code: 401, status: 'Unauthorized', message: '🔴 Password is incorrect.' })

    // JWT
    const userData = { id: user.id, first_name: user.first_name, email: user.email }
    const tokens = jwtTokens(userData)

    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
    res.json(tokens)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(401).json({ code: 401, status: 'Unauthorized', message: error.message })
  }
}

const refreshTokenController = (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token
    const { REFRESH_TOKEN_SECRET } = process.env

    if (!refreshToken) return res.status(401).json({ code: 401, status: 'Unauthorized', message: '🔴 The refresh token is null.' })
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, payload) => {
      if (error) return res.status(403).send({ code: 403, status: 'Forbidden', message: '⛔️ The refresh token is invalid.' })

      const { id, first_name, email } = payload
      const user = { id, first_name, email }

      const tokens = jwtTokens(user)
      res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
      res.status(200).json(tokens)
    })
  } catch (error) {
    res.status(401).send({ code: 401, status: 'Unauthorized', message: '🔴 Something went wrong.' })
  }
}

const logoutController = (req, res) => {
  try {
    if (!req.cookies.refresh_token) return res.status(404).json({ code: 404, status: 'Not found', message: '🔴 No user logged in.' })
    res.clearCookie('refresh_token')
    return res.status(200).json({ code: 200, status: 'OK', message: '👋 User logged out.' })
  } catch (error) {
    res.status(401).json({ code: 401, status: 'Unauthorized', message: '🔴 Something went wrong.' })
  }
}

export { loginController, refreshTokenController, logoutController }
