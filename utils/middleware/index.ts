import { Request, Response } from 'express'
import responses from '@helpers/responses'
import { Params } from '@src/helpers/params'

type ListResponseApi<T> =
    | {
          results: T[]
          error?: undefined
      }
    | {
          error: unknown
          results?: undefined
      }

type SingleResponseApi<T> =
    | {
          results: T
          error?: undefined
      }
    | {
          error: unknown
          results?: undefined
      }

interface Service<T, E extends string | number | symbol = ''> {
    getAll: (companyId: string, params: Params) => Promise<ListResponseApi<T>>
    getById: (
        companyId: string,
        genericId: string,
    ) => Promise<SingleResponseApi<T>>
    create: (
        companyId: string,
        data: Omit<T, E>,
    ) => Promise<SingleResponseApi<T>>
    update: (
        companyId: string,
        genericId: string,
        data: Partial<T>,
    ) => Promise<SingleResponseApi<T>>
    remove: (
        companyId: string,
        genericId: string,
    ) => Promise<SingleResponseApi<T>>
}

const doGetAll = async <T>(
    req: Request,
    res: Response,
    service: Service<T>,
) => {
    try {
        const companyId = req.cookies.company_id
        const queryParams = req.query

        if (!companyId) {
            return res.status(401).json({
                ...responses.unauthorized,
                message: 'Company id is required',
            })
        }

        const { results, error } = await service.getAll(companyId, queryParams)

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

const doGetById = async <T>(
    req: Request,
    res: Response,
    service: Service<T>,
) => {
    try {
        const companyId = req.cookies.company_id
        const { id } = req.params

        if (!companyId) {
            return res.status(401).json({
                ...responses.unauthorized,
                message: 'Company id is required',
            })
        }

        const { results, error } = await service.getById(companyId, id)

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

const doCreate = async <T, E extends string | number | symbol>(
    req: Request,
    res: Response,
    service: Service<T, E>,
) => {
    try {
        const companyId = req.cookies.company_id
        const data: Omit<T, E> = req.body.payload

        if (!companyId) {
            return res.status(401).json({
                ...responses.unauthorized,
                message: 'Company id is required',
            })
        }

        if (!data) {
            return res.status(400).json({
                ...responses.badRequest,
                message: 'Payload is empty',
            })
        }

        const { results, error } = await service.create(companyId, data)

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

const doUpdate = async <T>(
    req: Request,
    res: Response,
    service: Service<T>,
) => {
    try {
        const { id } = req.params
        const companyId = req.cookies.company_id
        const data: Partial<T> = req.body.payload

        if (!companyId) {
            return res.status(401).json({
                ...responses.unauthorized,
                message: 'Company id is required',
            })
        }

        if (!data) {
            return res.status(400).json({
                ...responses.badRequest,
                message: 'Payload is empty',
            })
        }

        const { results, error } = await service.update(companyId, id, data)

        if (error) {
            return res.status(500).json({ ...responses.serverError, error })
        }

        if (results) {
            return res.status(200).json({ ...responses.ok, results })
        }
    } catch (error) {
        res.status(500).json({ ...responses.serverError })
    }
}

const doRemove = async <T>(
    req: Request,
    res: Response,
    service: Service<T>,
) => {
    try {
        const { id } = req.params
        const companyId = req.cookies.company_id

        if (!companyId) {
            return res.status(401).json({
                ...responses.unauthorized,
                message: 'Company id is required',
            })
        }

        const { results, error } = await service.remove(companyId, id)

        if (error) {
            return res.status(500).json({ ...responses.serverError, error })
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

export default { doGetAll, doGetById, doCreate, doUpdate, doRemove }
