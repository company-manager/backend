/* eslint-disable camelcase */
import { Request, Response } from 'express'
import clientsServices from '@services-V1/clients.services'
import responses from '@src/helpers/responses'

const getAllByCompany = async (req: Request, res: Response) => {
    try {
        const { company_id } = req.cookies

        const results = await clientsServices.getAllByCompany(company_id)

        if (!results) {
            return res.status(403).json({
                ...responses.forbidden,
                message: 'No results',
            })
        }

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        console.log(error)
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const { id: clientId } = req.params
        const { company_id } = req.cookies

        if (!company_id) {
            return res.status(400).json({ code: 400, message: 'Bad request' })
        }

        const results = await clientsServices.getById(company_id, clientId)

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        console.log(error)
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const { id: client_id } = req.params
        const { company_id } = req.cookies

        const doesClientExists = await clientsServices.getById(
            company_id,
            client_id,
        )

        if (!doesClientExists) {
            return res.status(400).json({ ...responses.badRequest })
        }

        const results = await clientsServices.remove(company_id, client_id)

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        console.log(error)
    }
}

const add = async (req: Request, res: Response) => {
    try {
        const { name, taxpayer_id } = req.body?.client

        if (!!name || !!taxpayer_id) {
            return res.status(400).json({ ...responses.badRequest })
        }

        const clientData = { name, taxpayer_id }

        const results = clientsServices.add(clientData)

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        console.log(error)
    }
}

export default { getAllByCompany, getById, remove, add }
