const ok = {
    code: 200,
    message: 'OK',
}

const created = {
    code: 201,
    message: 'Created',
}

const redirect = {
    code: 301,
    message: 'Redirected',
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

const serverError = {
    code: 500,
    message: 'Server error',
}

export default {
    ok,
    unauthorized,
    notFound,
    forbidden,
    created,
    badRequest,
    redirect,
    serverError,
}
