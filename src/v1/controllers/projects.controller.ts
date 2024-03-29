/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { Project } from '@global-types/index'
import projectsServices from '@services-V1/projects.services'
import middlewareUtils from '@utils/middleware/.'

const getAll = async (req: Request, res: Response) => {
    middlewareUtils.doGetAll<Project>(req, res, projectsServices)
}

const getById = async (req: Request, res: Response) => {
    middlewareUtils.doGetById<Project>(req, res, projectsServices)
}

const create = async (req: Request, res: Response) => {
    middlewareUtils.doCreate<Project, 'id'>(req, res, projectsServices)
}

const update = async (req: Request, res: Response) => {
    middlewareUtils.doUpdate<Project>(req, res, projectsServices)
}

const remove = async (req: Request, res: Response) => {
    middlewareUtils.doRemove<Project>(req, res, projectsServices)
}

export default { getAll, getById, create, update, remove }
