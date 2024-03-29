/* eslint-disable camelcase */
import pool from '@database/index'
import { Project } from '@global-types/index'
import projectsQueries from '@queries-V1/projects.queries'

const getAll = async (companyId: string) => {
    try {
        const result = await pool.query(projectsQueries.getAll, [companyId])
        const results: Project[] = result.rows

        return { results }
    } catch (error) {
        return { error }
    }
}

const getById = async (companyId: string, projectId: string) => {
    try {
        const result = await pool.query(projectsQueries.getById, [
            companyId,
            projectId,
        ])
        const results: Project = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

const create = async (companyId: string, data: Omit<Project, 'id'>) => {
    try {
        const { project_name, status_id, client_id, user_id } = data

        const result = await pool.query(projectsQueries.create, [
            project_name,
            status_id,
            companyId,
            client_id,
            user_id,
        ])

        const results: Project = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

const update = async (
    companyId: string,
    projectId: string,
    data: Partial<Project>,
) => {
    try {
        const { client_id, project_name, status_id, user_id } = data

        const result = await pool.query(projectsQueries.update, [
            projectId,
            project_name,
            status_id,
            companyId,
            client_id || null,
            user_id || null,
        ])

        const results: Project = result?.rows?.[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

const remove = async (companyId: string, projectId: string) => {
    try {
        const result = await pool.query(projectsQueries.remove, [
            companyId,
            projectId,
        ])
        const results: Project = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

export default { getAll, getById, create, update, remove }
