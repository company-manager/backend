const ok = {
    code: 200,
    message: 'OK',
}

const created = {
    code: 201,
    message: 'Created',
}

const badRequest = {
    code: 400,
    message: 'Bad request',
}

const unauthorized = {
    code: 401,
    message: 'Unauthorized',
}

const forbidden = {
    code: 403,
    message: 'Forbidden',
}

const notFound = {
    code: 404,
    message: 'Not found',
}

export default { ok, unauthorized, notFound, forbidden, created, badRequest }
