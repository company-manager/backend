import { isPostmanVariable } from '@utils/.'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

dotenv.config()

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization // Bearer TOKEN
    const token = authHeader?.split(' ')[1]
    console.log(authHeader)

    if (!token || isPostmanVariable(token))
        return res.status(403).json({
            code: 403,
            status: 'Forbidden',
            message: 'The authentication token is null.',
        })

    const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || 'access_token_secret'

    jwt.verify(token, accessTokenSecret, (error) => {
        if (error) {
            return res.status(401).json({
                code: 401,
                status: 'Unauthorized',
                message: 'The authentication token is invalid.',
            })
        }

        next()
    })
}

const adminProtected = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log('in')
    next()
}

export { authenticateToken, adminProtected }
