/* eslint-disable camelcase */
import userService from '@services-V1/users.services'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { setJwtTokens, setNewAccessToken } from '@utils/jwt'
import responses from '@src/helpers/responses'

dotenv.config()

const login = async (req, res) => {
    try {
        const validUserRequest = req.body.user
        if (!validUserRequest)
            return res.status(400).json({
                ...responses.badRequest,
                tip: 'No user email or password given',
            })

        const { email, password } = req.body.user
        const user = await userService.getByEmail(email)

        if (!user)
            return res.status(401).json({
                ...responses.unauthorized,
                tip: 'Email not found',
            })

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.user_password,
        )
        if (!isPasswordCorrect)
            return res.status(401).json({
                ...responses.unauthorized,
                tip: 'Password is incorrect.',
            })

        const userData = {
            id: user.id,
            first_name: user.first_name,
            email: user.email,
        }
        const tokens = setJwtTokens(userData)

        res.status(200)
            .cookie('refresh_token', tokens.refreshToken, {
                httpOnly: true,
            })
            .json(tokens)
    } catch (error) {
        res.status(401).json({
            ...responses.unauthorized,
            error,
        })
    }
}

const refresh = (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token

        if (!refreshToken)
            return res.status(401).json({
                code: 401,
                status: 'Unauthorized',
                message: 'The refresh token is null.',
            })

        const refreshTokenSecret =
            process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret'

        jwt.verify(refreshToken, refreshTokenSecret, (error, payload) => {
            if (error)
                return res.status(401).send({
                    code: 401,
                    status: 'Unauthorized',
                    message: 'The refresh token is invalid.',
                })

            const { id, first_name, email } = payload
            const user = { id, first_name, email }

            const accessToken = setNewAccessToken(user)
            const tokens = { accessToken, refreshToken }

            res.header('Authorization', accessToken)
            res.status(200).json({
                user: { ...user },
                tokens,
            })
        })
    } catch (error) {
        res.status(401).send({
            code: 401,
            status: 'Unauthorized',
            message: 'Something went wrong.',
        })
    }
}

const logout = (req, res) => {
    try {
        if (!req.cookies.refresh_token)
            return res.status(404).json({
                code: 404,
                status: 'Not found',
                message: 'No user logged in.',
            })
        res.clearCookie('refresh_token')
        return res
            .status(200)
            .json({ code: 200, status: 'OK', message: '👋 User logged out.' })
    } catch (error) {
        res.status(401).json({
            code: 401,
            status: 'Unauthorized',
            message: 'Something went wrong.',
        })
    }
}

export default { login, refresh, logout }
