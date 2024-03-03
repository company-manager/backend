import { Request, Response, NextFunction } from 'express'

type HttpCallback = {
    req: Request
    res: Response
    next?: NextFunction
}

type Role = {
    id: string
    created_at: string
    name: string
}

type User = {
    id: string
    created_at: string
    first_name: string
    last_name: string
    email: string
    user_password: string
    role_id: number
    company_id: string
}

type UserUpdate = {
    first_name?: string
    last_name?: string
    email?: string
    user_password?: string
    role_id?: number
}

type Company = {
    id?: string
    created_at?: string
    company_name: string
    taxpayer_id: string
}

export { Company, HttpCallback, Role, User, UserUpdate }
