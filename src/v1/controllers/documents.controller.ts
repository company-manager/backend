import { Request, Response } from 'express'
import { Document } from '@global-types/index'
import documentsServices from '@services-V1/documents.services'
import middlewareUtils from '@utils/middleware/.'

const getAll = async (req: Request, res: Response) => {
    middlewareUtils.doGetAll<Document>(req, res, documentsServices)
}

const getById = async (req: Request, res: Response) => {
    middlewareUtils.doGetById<Document>(req, res, documentsServices)
}

const create = async (req: Request, res: Response) => {
    middlewareUtils.doCreate<Document, 'id' | 'company_id'>(
        req,
        res,
        documentsServices,
    )
}

const update = async (req: Request, res: Response) => {
    middlewareUtils.doUpdate<Document>(req, res, documentsServices)
}

const remove = async (req: Request, res: Response) => {
    middlewareUtils.doRemove<Document>(req, res, documentsServices)
}

export default { getAll, getById, create, update, remove }
