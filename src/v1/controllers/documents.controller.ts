import { Request, Response } from 'express'
import { Document } from '@global-types/index'
import documentsRepository from '@repositories-V1/documents.repository'
import middlewareUtils from '@utils/middleware/.'

const getAll = async (req: Request, res: Response) => {
    middlewareUtils.doGetAll<Document>(req, res, documentsRepository)
}

const getById = async (req: Request, res: Response) => {
    middlewareUtils.doGetById<Document>(req, res, documentsRepository)
}

const create = async (req: Request, res: Response) => {
    middlewareUtils.doCreate<Document, 'id' | 'company_id'>(
        req,
        res,
        documentsRepository,
    )
}

const update = async (req: Request, res: Response) => {
    middlewareUtils.doUpdate<Document>(req, res, documentsRepository)
}

const remove = async (req: Request, res: Response) => {
    middlewareUtils.doRemove<Document>(req, res, documentsRepository)
}

export default { getAll, getById, create, update, remove }
