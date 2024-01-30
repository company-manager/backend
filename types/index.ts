import { Request, Response, NextFunction } from 'express'

type HttpCallback = {
    req: Request
    res: Response
    next?: NextFunction
}

type User = {
    first_name: string
    last_name: string
    email: string
    user_password: string
    role_id: number
}

type UserUpdate = {
    first_name?: string
    last_name?: string
    email?: string
    user_password?: string
    role_id?: number
}

export { HttpCallback, User, UserUpdate }
