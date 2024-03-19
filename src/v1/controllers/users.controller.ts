/* eslint-disable camelcase */

import { Request, Response } from 'express'
import usersServices from '@services-V1/users.services'
import responses from '@helpers/responses'

const getAll = async (req: Request, res: Response) => {
    try {
        const results = await usersServices.getAll()

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        return res
            .status(401)
            .json({ ...responses.unauthorized, results: error })
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const results = await usersServices.getById(id)

        if (!results)
            return res.status(404).json({
                ...responses.notFound,
                message: 'Id not found',
            })

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        return res
            .status(401)
            .json({ ...responses.unauthorized, results: error })
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const { email } = req.body.user
        const isEmailAlreadyTaken = await usersServices.getByEmail(email)

        if (isEmailAlreadyTaken) {
            return res.status(403).json({
                ...responses.forbidden,
                message: `Email ${email} already taken`,
            })
        }

        const results = await usersServices.create(req.body.user)

        return res.status(201).json({
            ...responses.created,
            message: 'User created',
            results,
        })
    } catch (error) {
        return res
            .status(401)
            .json({ ...responses.unauthorized, results: error })
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const isIdValid = await usersServices.getById(id)

        if (!isIdValid) {
            return res.status(403).json({
                ...responses.forbidden,
                message: "User doesn't exists",
            })
        }

        const results = await usersServices.remove(id)
        res.status(200).send({
            ...responses.ok,
            message: `User ${id} deleted`,
            results,
        })
    } catch (error) {
        return res
            .status(401)
            .json({ ...responses.unauthorized, results: error })
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const hasData = req.body.user && Object.keys(req.body.user)?.length > 0

        if (!hasData) {
            return res.status(400).send({
                ...responses.badRequest,
                message: 'Request body must include user data.',
            })
        }

        const results = await usersServices.update(id, req?.body?.user)
        res.status(200).send({
            ...responses.ok,
            message: 'User updated',
            results,
        })
    } catch (error) {
        return res
            .status(401)
            .json({ ...responses.unauthorized, results: error })
    }
}

export default { getAll, getById, create, update, remove }
