import { Request, Response } from 'express'
import responses from '@src/helpers/responses'
import rolesServices from '@services-V1/roles.services'

const getAll = async (req: Request, res: Response) => {
    try {
        const results = await rolesServices.getAll()
        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        res.status(401).json({
            ...responses.unauthorized,
            results: error,
        })
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const results = await rolesServices.getById(id)

        if (!results) {
            return res.status(400).json({
                ...responses.badRequest,
                tip: '🔴 Role id is not valid',
            })
        }

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        res.status(401).json({
            ...responses.unauthorized,
            results: error,
        })
    }
}

const add = async (req: Request, res: Response) => {
    try {
        const { name } = req.body.role
        const doesRoleAlreadyExist = await rolesServices.getByName(name)

        if (doesRoleAlreadyExist) {
            return res
                .status(403)
                .json({ ...responses.forbidden, tip: '🔴 Role already exists' })
        }

        const results = await rolesServices.add(name)

        return res.status(201).json({ ...responses.created, results })
    } catch (error) {
        res.status(401).json({
            ...responses.unauthorized,
            results: error,
        })
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const doesRoleExist = await rolesServices.getById(id)

        if (!doesRoleExist) {
            return res.status(400).json({
                ...responses.badRequest,
                tip: '🔴 Role id is not valid',
            })
        }

        const results = await rolesServices.remove(id)
        return res.status(200).send({ ...responses.ok, results })
    } catch (error) {
        res.status(401).json({
            ...responses.unauthorized,
            results: error,
        })
    }
}

export default { getAll, getById, remove, add }
