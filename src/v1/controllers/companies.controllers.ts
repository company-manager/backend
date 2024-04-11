/* eslint-disable camelcase */
import usersRepository from '@v1/repositories/users.repository'
import responses from '@src/helpers/responses'
import { Request, Response } from 'express'
import companiesRepository from '@v1/repositories/companies.repository'
import { isAdmin } from '@utils/index'

const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { results, error } = await companiesRepository.getById(id)

        if (!results)
            return res.status(404).json({
                ...responses.notFound,
                message: 'Company not found',
            })

        if (error) {
            return res.status(400).json({ ...responses.badRequest, error })
        }

        if (!results) {
            return res
                .status(404)
                .json({ ...responses.notFound, message: `Id:${id} not found` })
        }

        if (results) {
            return res.status(200).json({ ...responses.ok, results })
        }
    } catch (error) {
        return res.status(500).json({ ...responses.serverError, error })
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const { id: companyId } = req.params
        const { id: userId } = req.body.payload.user
        const { results: userResults, error: userError } =
            await usersRepository.getById(companyId, userId)
        const isUserValid = !!userId && !userError
        const { results: companyResults, error: companyError } =
            await companiesRepository.getById(companyId)

        if (!isUserValid) {
            return res.status(401).json({
                ...responses.unauthorized,
                message: 'User invalid',
            })
        }

        if (companyError) {
            return res
                .status(500)
                .json({ ...responses.serverError, error: companyError })
        }

        if (!companyResults) {
            return res
                .status(404)
                .json({ ...responses.notFound, message: 'Company not found' })
        }

        if (userResults) {
            const role = userResults.role_id
            const userCompanyId = userResults.company_id
            const isSameCompany = companyId === userCompanyId
            const hasAdminPermissions = isAdmin(role) && isSameCompany

            if (hasAdminPermissions) {
                const { results: removeResults, error: removeError } =
                    await companiesRepository.remove(companyId)

                if (removeError) {
                    return res
                        .status(500)
                        .json({ ...responses.serverError, removeError })
                }

                if (removeResults) {
                    return res.status(200).json({
                        ...responses.ok,
                        message: `Id: ${companyId} deleted`,
                        results: removeResults,
                    })
                }
            }

            return res.status(403).json({
                ...responses.forbidden,
                message: 'User has no permission to delete company',
            })
        }
    } catch (error) {
        res.status(500).json({ ...responses.serverError })
    }
}

export default { getById, remove }
