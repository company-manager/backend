/* eslint-disable camelcase */
import responses from '@src/helpers/responses'
import { Request, Response } from 'express'
import clientsServices from '@services-V1/clients.services'
import { isEmpty } from '@utils/index'

// TODO handle errors

const getAll = async (req: Request, res: Response) => {
    try {
        const { company_id } = req.cookies

        const results = await clientsServices.getAll(company_id)

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

        if (isEmpty(results)) {
            return res.status(404).json({
                ...responses.notFound,
                message: `Id: ${clientId} not found`,
            })
        }

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        console.log(error)
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const { id: clientId } = req.params
        const { company_id } = req.cookies

        const client = await clientsServices.getById(company_id, clientId)
        const clientAlreadyExists = !isEmpty(client)

        if (!clientAlreadyExists) {
            return res.status(404).json({
                ...responses.notFound,
                message: `Id: ${clientId} not found`,
            })
        }

        const results = await clientsServices.remove(company_id, clientId)

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        console.log(error)
    }
}

const add = async (req: Request, res: Response) => {
    try {
        const {
            name,
            taxpayer_id,
            address_1,
            address_2,
            city,
            country,
            phone_1,
            phone_2,
        } = req.body?.client
        const { company_id } = req.cookies

        if (isEmpty(name) || isEmpty(company_id)) {
            return res.status(400).json({
                ...responses.badRequest,
                message: 'No company id or client name given',
            })
        }

        const client = await clientsServices.getByTaxpayerId(
            company_id,
            taxpayer_id,
        )
        const clientAlreadyExists = !isEmpty(client)

        if (clientAlreadyExists) {
            return res.status(400).json({
                ...responses.badRequest,
                message: `Client with taxpayer id: ${taxpayer_id} already exists`,
            })
        }

        const newClientData = {
            name,
            taxpayer_id,
            address_1,
            address_2,
            city,
            country,
            phone_1,
            phone_2,
        }

        const results = await clientsServices.add(newClientData, company_id)
        return res.status(201).json({ ...responses.created, results })
    } catch (error) {
        console.log(error)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const { id: clientId } = req.params
        const { company_id } = req.cookies

        if (!clientId && !company_id) {
            return res.status(400).json({
                ...responses.badRequest,
                message: 'Client or company id missing',
            })
        }

        const isRequestValid =
            req.body.client && Object.keys(req.body.client)?.length > 0

        if (!isRequestValid) {
            return res
                .status(400)
                .json({ ...responses.badRequest, message: 'No data provided' })
        }

        const results = await clientsServices.update(
            company_id,
            clientId,
            req.body.client,
        )

        return res
            .status(200)
            .json({ ...responses.ok, message: 'Client edited', results })
    } catch (error) {
        console.log(error)
    }
}

export default { getAll, getById, remove, add, update }
