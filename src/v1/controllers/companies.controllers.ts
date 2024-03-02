/* eslint-disable camelcase */

import responses from '@src/helpers/responses'
import { Request, Response } from 'express'
import companiesServices from '@services-V1/companies.services'
import { Company } from '@global-types/index'

const getById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const results = await companiesServices.getById(id)

        console.log(results)

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
        const isValid = await companiesServices.getById(id)

        if (!isValid) {
            return res.status(403).json({
                ...responses.forbidden,
                message: 'Company does not exist',
            })
        }

        const results = await companiesServices.remove(id)
        res.status(200).json({
            ...responses.ok,
            message: `${results.company_name} deleted`,
            results,
        })
    } catch (error) {
        res.status(403).json({
            ...responses.forbidden,
            error,
        })
    }
}

export default { add, getById, remove }
