const origin = process.env.API_ORIGIN || 'http://localhost:3003'
const pathToFile = `${origin}/public/more_info.pdf`

const subject = 'ℹ️ INFO: Company Manager'

const body = `
<div>
    <p>Hey 👋🏼</p>
    <br>
    <p>Obrigado pelo interesse. Em anexo segue o pdf com a apresentação da aplicação de gestão da Company Manager.</p>
    <br>
    <br>
</div>
`
const attachments = [
    {
        filename: 'more_info.pdf',
        path: pathToFile,
    },
]

export default { subject, body, attachments }
