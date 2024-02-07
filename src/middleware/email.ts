import nodemailer from 'nodemailer'
import cors from 'cors'

const transporter = nodemailer.createTransport({
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
        console.log('🔥 Server is ready to take our messages')
    }
})

const corsEmail = (req, res, next) => {
    const origin = process.env.API_ORIGIN || 'http://localhost:5173'
    const corsOptions = {
        origin,
    }
    cors(corsOptions)
    next()
}

const send = (req, res) => {
    const email = req.body?.email
    const token = req.headers?.authorization?.split(' ')[1]

    const options = {
        from: 'support@companymanager.space',
        to: email,
        subject: 'ℹ️ INFO: Company Manager',
        text: 'Hey 👋, obrigado pelo email. Iremos contactar assim que possível.',
    }

    if (!token) return res.status(403).json({ code: 403, message: 'Forbidden' })

    if (token === process.env.EMAIL_PW) {
        transporter.sendMail(options, (error, info) => {
            if (error)
                return res
                    .status(400)
                    .send({ code: 400, message: 'Bad request' })

            console.log('Email sent: ' + info.response)
            return res.status(200).json({ message: 'Success' })
        })
    }
}

export default { send, corsEmail }
