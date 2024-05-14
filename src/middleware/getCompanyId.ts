import { NextFunction, Request, Response } from 'express'
import responses from '@src/helpers/responses'

const getCompanyId = (req: Request, res: Response, next: NextFunction) => {
    const companyId = req.cookies.company_id

    if (!companyId) {
        return res.status(401).json({
            ...responses.unauthorized,
            message: 'Company id is required',
        })
    }

    res.locals.companyId = companyId
    if (companyId) next()
}

export default getCompanyId
