/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { Client } from '@global-types/index'
import clientsRepository from '@v1/repositories/clients.repository'
import responses from '@src/helpers/responses'

const getAll = async (req: Request, res: Response) => {
    try {
        const { companyId } = res.locals

        const { results, error } = await clientsRepository.getAll(companyId)

        if (error) {
            return res.status(400).json({ ...responses.badRequest, error })
        }

        if (results) {
            return res.status(200).json({ ...responses.ok, results })
        }
    } catch (error) {
        return res.status(500).json({ ...responses.serverError, error })
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const { companyId } = res.locals
        const { id } = req.params

        const { results, error } = await clientsRepository.getById(
            companyId,
            id,
        )

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
        return res.status(500).json({ ...responses.serverError })
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const { companyId } = res.locals
        const data: Omit<Client, 'id' | 'company_id'> = req.body.payload

        if (!data) {
            return res.status(400).json({
                ...responses.badRequest,
                message: 'Payload is empty',
            })
        }

        const { results, error } = await clientsRepository.create(
            companyId,
            data,
        )

        if (error) {
            return res.status(500).json({ ...responses.serverError, error })
        }

        if (results) {
            return res.status(201).json({ ...responses.created, results })
        }
    } catch (error) {
        res.status(500).json({ ...responses.serverError })
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const { companyId } = res.locals
        const { id } = req.params
        const data: Partial<Client> = req.body.payload

        if (!data) {
            return res.status(400).json({
                ...responses.badRequest,
                message: 'Payload is empty',
            })
        }

        const { results, error } = await clientsRepository.update(
            companyId,
            id,
            data,
        )

        if (error) {
            return res.status(500).json({ ...responses.serverError, error })
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
        res.status(500).json({ ...responses.serverError })
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const { companyId } = res.locals
        const { id } = req.params

        const { results, error } = await clientsRepository.remove(companyId, id)

        if (error) {
            return res.status(500).json({ ...responses.serverError, error })
        }

        if (!results) {
            return res
                .status(404)
                .json({ ...responses.notFound, message: `Id:${id} not found` })
        }

        if (results) {
            return res.status(200).json({
                ...responses.ok,
                message: `Id: ${id} deleted`,
                results,
            })
        }
    } catch (error) {
        res.status(500).json({ ...responses.serverError })
    }
}

export default { getAll, getById, create, remove, update }
