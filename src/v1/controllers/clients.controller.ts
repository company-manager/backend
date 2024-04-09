/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { Client } from '@global-types/index'
import clientsRepository from '@repositories-V1/clients.repository'
import middlewareUtils from '@utils/middleware/.'

const getAll = async (req: Request, res: Response) => {
    middlewareUtils.doGetAll<Client>(req, res, clientsRepository)
}

const getById = async (req: Request, res: Response) => {
    middlewareUtils.doGetById<Client>(req, res, clientsRepository)
}

const create = async (req: Request, res: Response) => {
    middlewareUtils.doCreate<Client, 'id' | 'company_id'>(
        req,
        res,
        clientsRepository,
    )
}

const update = async (req: Request, res: Response) => {
    middlewareUtils.doUpdate<Client>(req, res, clientsRepository)
}

const remove = async (req: Request, res: Response) => {
    middlewareUtils.doRemove<Client>(req, res, clientsRepository)
}

export default { getAll, getById, create, remove, update }
