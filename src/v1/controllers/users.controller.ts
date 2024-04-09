/* eslint-disable camelcase */
import { Request, Response } from 'express'
import usersRepository from '@repositories-V1/users.repository'
import responses from '@helpers/responses'
import middlewareUtils from '@utils/middleware/.'
import { User } from '@global-types/index'

const getAll = (req: Request, res: Response) => {
    middlewareUtils.doGetAll<User>(req, res, usersRepository)
}

const getById = (req: Request, res: Response) => {
    middlewareUtils.doGetById<User>(req, res, usersRepository)
}

const create = async (req: Request, res: Response) => {
    try {
        const { email } = req.body.payload
        const isEmailAlreadyTaken = await usersRepository.getByEmail(email)

        if (isEmailAlreadyTaken) {
            return res.status(403).json({
                ...responses.forbidden,
                message: `Email ${email} already taken`,
            })
        }

        middlewareUtils.doCreate<User, 'id' | 'company_id'>(
            req,
            res,
            usersRepository,
        )
    } catch (error) {
        return res.status(500).json({ ...responses.serverError, error })
    }
}

const update = (req: Request, res: Response) => {
    middlewareUtils.doUpdate<User>(req, res, usersRepository)
}

const remove = async (req: Request, res: Response) => {
    middlewareUtils.doRemove<User>(req, res, usersRepository)
}

export default { getAll, getById, create, remove, update }
