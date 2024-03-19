/* eslint-disable camelcase */
import userService from '@services-V1/users.services'
import responses from '@src/helpers/responses'
import { Request, Response } from 'express'
import companiesServices from '@services-V1/companies.services'
import { Company } from '@global-types/index'
import { rolesMapping } from '@utils/index'

const getById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const results = await companiesServices.getById(id)

        if (!results)
            return res.status(404).json({
                ...responses.notFound,
                message: '🔴 Company not found',
            })

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        console.log(error)
        return res
            .status(401)
            .json({ ...responses.unauthorized, results: error })
    }
}

const add = async (req: Request, res: Response) => {
    try {
        const { taxpayer_id } = req.body?.company
        const doesCompanyAlreadyExists =
            await companiesServices.getByTaxpayerId(taxpayer_id)

        if (doesCompanyAlreadyExists) {
            return res.status(403).json({
                ...responses.forbidden,
                message: 'Taxpayer id already in use',
            })
        }

        const { company_name } = req.body.company
        const newCompany: Company = {
            company_name,
            taxpayer_id,
        }

        const results = await companiesServices.add(newCompany)

        return res
            .status(200)
            .json({ ...responses.created, message: 'Company created', results })
    } catch (error) {
        return res
            .status(404)
            .json({ ...responses.unauthorized, results: error })
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { id: userId } = req.body.user
        const { error, result } = await userService.getById(userId)
        console.log('_userId', userId, !!userId)
        console.log('_error', error, !error)
        console.log('_result', result)
        const isUserValid = !!userId && !error
        console.log('_isUserValid', isUserValid)
        const company = await companiesServices.getById(id)

        if (!isUserValid) {
            return res.status(401).json({
                ...responses.unauthorized,
                message: error?.message,
            })
        }

        if (!company) {
            return res.status(404).json({
                ...responses.notFound,
                message: 'Company does not exist',
            })
        }

        if (result) {
            const role = result.role_id
            const companyId = result.company_id
            const isAdmin =
                rolesMapping[`${role}`] === rolesMapping['1'] &&
                companyId === id

            if (isAdmin) {
                const results = await companiesServices.remove(id)
                return res.status(200).json({
                    ...responses.ok,
                    message: `${results.company_name} deleted`,
                    results,
                })
            }

            return res.status(403).json({
                ...responses.forbidden,
                message: 'User has no permission to delete company',
            })
        }
    } catch (error) {
        res.status(403).json({
            ...responses.forbidden,
            error,
        })
    }
}

export default { add, getById, remove }
