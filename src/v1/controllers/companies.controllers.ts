/* eslint-disable camelcase */
import userService from '@services-V1/users.services'
import responses from '@src/helpers/responses'
import { Request, Response } from 'express'
import companiesServices from '@services-V1/companies.services'
import { Company } from '@global-types/index'
import { isAdmin } from '@utils/index'

const getById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const results = await companiesServices.getById(id)

        if (!results)
            return res.status(404).json({
                ...responses.notFound,
                message: 'Company not found',
            })

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        console.log(error)
        return res
            .status(401)
            .json({ ...responses.unauthorized, results: error })
    }
}

const create = async (req: Request, res: Response) => {
    if (req.cookies.company_id) {
        return res.status(403).json({
            ...responses.forbidden,
            message: 'You have no permission to add a new company',
        })
    }

    try {
        const { taxpayer_id } = req.body?.company
        const companyAlreadyExists =
            await companiesServices.getByTaxpayerId(taxpayer_id)

        if (companyAlreadyExists) {
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

        const results = await companiesServices.create(newCompany)

        return res
            .status(200)
            .json({ ...responses.created, message: 'Company created', results })
    } catch (error) {
        return res
            .status(401)
            .json({ ...responses.unauthorized, results: error })
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { id: userId } = req.body.user
        const { error, result } = await userService.getById(userId)
        const isUserValid = !!userId && !error
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
            const isSameCompany = companyId === id
            const hasAdminPermissions = isAdmin(role) && isSameCompany

            if (hasAdminPermissions) {
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

export default { create, getById, remove }
