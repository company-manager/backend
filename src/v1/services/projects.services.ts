import { Project } from '@global-types/index'
import projectsRepository from '@repositories-V1/projects.repository'

const getAll = async (companyId: string) => {
    const results = await projectsRepository.getAll(companyId)
    return results
}

const getById = async (companyId: string, projectId: string) => {
    const results = await projectsRepository.getById(companyId, projectId)
    return results
}

const create = async (companyId: string, data: Omit<Project, 'id'>) => {
    const results = await projectsRepository.create(companyId, data)
    return results
}

const update = async (
    companyId: string,
    projectId: string,
    data: Partial<Project>,
) => {
    const results = await projectsRepository.update(companyId, projectId, data)
    return results
}

const remove = async (companyId: string, projectId: string) => {
    const results = await projectsRepository.remove(companyId, projectId)
    return results
}

export default { getAll, getById, create, update, remove }
