/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { Client } from '@global-types/index'
import clientsServices from '@services-V1/clients.services'
import middlewareUtils from '@utils/middleware/.'

const getAll = async (req: Request, res: Response) => {
    middlewareUtils.doGetAll<Client>(req, res, clientsServices)
}

const getById = async (req: Request, res: Response) => {
    middlewareUtils.doGetById<Client>(req, res, clientsServices)
}

const create = async (req: Request, res: Response) => {
    middlewareUtils.doCreate<Client, 'id' | 'company_id'>(
        req,
        res,
        clientsServices,
    )
}

const update = async (req: Request, res: Response) => {
    middlewareUtils.doUpdate<Client>(req, res, clientsServices)
}

const remove = async (req: Request, res: Response) => {
    middlewareUtils.doRemove<Client>(req, res, clientsServices)
}

export default { getAll, getById, create, remove, update }
