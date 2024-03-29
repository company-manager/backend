import { NextFunction, Request, Response } from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import moreInfoEmail from '@emails/more-info'
import { SUPPORT_EMAIL } from '@emails/list'

export const transporter = nodemailer.createTransport({
    host: 'smtp0001.neo.space',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_PROVIDER_ADDRESS || '',
        pass: process.env.EMAIL_PROVIDER_PW || '',
    },
})

transporter.verify((error) => {
    if (error) {
        console.warn(
            '🚨 Check email and password provided in /src/middleware/email.ts',
        )
    } else {
        console.log('🌱 Server is ready to take our messages')
    }
})

const corsEmail = (req: Request, res: Response, next: NextFunction) => {
    const origin = process.env.API_ORIGIN || 'http://localhost:5173'
    const corsOptions = { origin }
    cors(corsOptions)
    next()
}

const send = (req: Request, res: Response) => {
    const email = req.body?.email
    const token = req.headers?.authorization?.split(' ')[1]

    const options = {
        from: SUPPORT_EMAIL,
        to: email,
        subject: moreInfoEmail.subject,
        html: moreInfoEmail.body,
        attachments: moreInfoEmail.attachments,
    }

    if (!token) return res.status(403).json({ code: 403, message: 'Forbidden' })

    const authToken = process.env.EMAIL_PW || 'secret_email_dev'
    if (token === authToken) {
        transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log(error)
                return res
                    .status(400)
                    .send({ code: 400, message: 'Bad request' })
            }

            console.log('Email sent: ' + info.response)
            return res.status(200).json({ message: 'Success' })
        })
    } else {
        return res.status(400).json({ message: 'Denied' })
    }
}

export default { send, corsEmail }
