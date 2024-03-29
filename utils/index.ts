import { SUPPORT_EMAIL } from '@emails/list'
import { Email } from '@global-types/index'
import crypto from 'crypto'
import { transporter } from '@middleware/email'

const rolesMapping = {
    1: 'Admin',
    2: 'User',
    3: 'Guest',
}

const isPostmanVariable = (token: string): boolean =>
    !!process.env.NODE_ENV && token?.startsWith('{{')

const isEmpty = (data: string | [] | object): boolean => {
    if (!data) return true

    switch (typeof data) {
        case 'string':
            return data.length === 0
        case 'object': {
            return Object.keys(data).length === 0
        }
        case 'number':
            return false
    }
}

const isAdmin = (roleId: number): boolean =>
    rolesMapping[`${roleId}`] === rolesMapping['1']

const generateToken = (bytes: number = 32) =>
    crypto.randomBytes(bytes).toString('hex')

const sendEmail = async ({
    body,
    subject,
    attachments,
    from = SUPPORT_EMAIL,
    to,
}: Partial<Email>) => {
    const options = {
        from,
        to,
        subject,
        html: body,
        attachments,
    }

    transporter.sendMail(options, (error) => {
        if (error) {
            console.log(error)
        }
    })
}

const editString = (editableString: string, replacements: string[]): string => {
    const hasReplacements = replacements.length > 0

    if (hasReplacements) {
        let editedString = ''

        replacements.forEach((replace, index) => {
            if (!editedString) {
                editedString = editableString.replace(`_$${index + 1}`, replace)
            }

            editedString = editedString.replace(`_$${index + 1}`, replace)
        })

        return editedString
    }

    return editableString
}

export {
    rolesMapping,
    isPostmanVariable,
    isEmpty,
    isAdmin,
    generateToken,
    sendEmail,
    editString,
}
