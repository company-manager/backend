import { isPostmanVariable } from '@utils/.'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const userLogInAuth = (req, res, next) => {
    const user = req.body.user

    if (!user) res.status(403).send('🔴 You need to be logged in to access.')

    next()
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization // Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1]

    if (!token || isPostmanVariable(token))
        return res.status(401).json({
            code: 401,
            status: 'Unauthorized',
            message: '🔴 The authentication token is null.',
        })
    const { ACCESS_TOKEN_SECRET } = process.env

    jwt.verify(token, ACCESS_TOKEN_SECRET, (error) => {
        if (error)
            return res.status(403).json({
                code: 403,
                status: 'Forbidden',
                message: '🔴 The authentication token is invalid.',
            })

        next()
    })
}

export { authenticateToken, userLogInAuth }
