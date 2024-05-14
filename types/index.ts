import { GENERAL_EMAIL, SUPPORT_EMAIL } from '@emails/list'
import { Request, Response, NextFunction, Locals } from 'express'

interface HttpCallback {
    req: Request
    res: Response
    next?: NextFunction
}

interface Role {
    id: string
    created_at: string
    name: string
}

interface User {
    id: string
    created_at?: string
    first_name: string
    last_name: string
    email: string
    user_password: string
    role_id: number
    company_id: string
    is_verified: boolean
    terms_accepted: boolean
    verification_token: string
}

interface Company {
    id: string
    created_at?: string
    company_name: string
    taxpayer_id: string
}

interface Attachment {
    filename: string
    path: string
}

type FromEmailAddress = typeof GENERAL_EMAIL | typeof SUPPORT_EMAIL

interface Email {
    body: string
    subject: string
    attachments?: Attachment[]
    from: FromEmailAddress
    to: string
}

type CompanyId = (Record<string, unknown> & Locals) | string

interface Client {
    id: string
    name: string
    company_id: (Record<string, unknown> & Locals) | string
    taxpayer_id: string
    address_1: string
    address_2: string
    city: string
    country: string
    phone_1: string
    phone_2: string
}

interface Project {
    id: string
    status_id: number
    project_name: string
    company_id: string
    client_id: string
    user_id: string
}

interface Document {
    id: string
    edited_at?: string
    title: string
    body?: string
    company_id: string
    author_id: string
}

export {
    CompanyId,
    Company,
    HttpCallback,
    Role,
    User,
    Email,
    Project,
    Client,
    Document,
}
