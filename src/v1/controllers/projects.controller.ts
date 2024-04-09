/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { Project } from '@global-types/index'
import projectsRepository from '@v1/repositories/projects.repository'
import middlewareUtils from '@utils/middleware/.'

const getAll = async (req: Request, res: Response) => {
    middlewareUtils.doGetAll<Project>(req, res, projectsRepository)
}

const getById = async (req: Request, res: Response) => {
    middlewareUtils.doGetById<Project>(req, res, projectsRepository)
}

const create = async (req: Request, res: Response) => {
    middlewareUtils.doCreate<Project, 'id'>(req, res, projectsRepository)
}

const update = async (req: Request, res: Response) => {
    middlewareUtils.doUpdate<Project>(req, res, projectsRepository)
}

const remove = async (req: Request, res: Response) => {
    middlewareUtils.doRemove<Project>(req, res, projectsRepository)
}

export default { getAll, getById, create, update, remove }
