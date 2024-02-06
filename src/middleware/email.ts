import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp0001.neo.space',
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: 'support@companymanager.space',
        pass: 'fWoTohzPeQdbCmSS@6Ln#24XsXGsjjA6',
    },
})

transporter.verify((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Server is ready to take our messages')
    }
})

const mailOptions = {
    from: 'support@companymanager.space',
    to: 'nunojllemos@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
}

const send = (req, res, next) => {
    console.log(req.body)
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })

    next()
}

export default { send }
