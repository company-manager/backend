const subject = '⚠️ Link de verificação'

const body = `
<div>
    <p>Olá _$1,</p>
    <br>
    <p>Segue o teu <a href="_$2">link</a> de verificação.</p>
    <br>
    <p>PS: Este link expira dentro de 24 horas.</p>
    <p>Até já</p>
    <br>
    <br>
</div>
`
const attachments = []

export default { subject, body, attachments }
